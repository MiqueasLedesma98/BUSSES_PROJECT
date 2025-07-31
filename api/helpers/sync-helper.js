const { axios } = require("../lib/axios");
const fs = require("fs");
const { Version, Multimedia, Promotion, Device } = require("../models");
const path = require("path");
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL;
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

const MEDIA_FOLDER = path.join(__dirname, "..");

/**
 * Aplana un objeto anidado con archivos a rutas relativas.
 * @param {object} structure - Objeto anidado con archivos y carpetas
 * @param {string} basePath - Ruta relativa acumulada
 * @returns {string[]} - Array de rutas relativas tipo "movie/eng/file.png"
 */
function flattenStructure(structure, basePath = "") {
  let files = [];

  for (const key in structure) {
    if (key === "files") {
      files.push(...structure[key].map((f) => path.join(basePath, f)));
    } else {
      for (const nested of structure[key]) {
        files.push(...flattenStructure(nested, path.join(basePath, key)));
      }
    }
  }

  return files;
}

async function exportLocalChanges() {
  const [multimedias, promotions, devices] = await Promise.all([
    Multimedia.findAll({
      attributes: ["views", "id"],
    }),
    Promotion.findAll({
      attributes: ["views", "id"],
    }),
    Device.findAll(),
  ]);

  return { multimedias, promotions, devices };
}

module.exports = {
  /**
   * @description Sincroniza las bases de datos remota y local
   */
  syncWithMainServer: async function () {
    const { data: remoteVersion } = await axios.get("/version");

    await axios.put("/version/sync", {
      data: await exportLocalChanges(),
    });

    const localVersion = await Version.findOne({
      order: [["number", "DESC"]],
    });

    if (!localVersion || localVersion?.number < remoteVersion?.number) {
      const response = await axios.get("/version/backup", {
        responseType: "stream",
      });

      const SQL_PATH = path.join(__dirname, "..", "temp_restore.sql");
      const writer = fs.createWriteStream(SQL_PATH);

      await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      const DB_NAME = process.env.DB_NAME;
      const DB_USER = process.env.DB_USER;
      const DB_PASS = process.env.DB_PASS;
      const DB_HOST = process.env.DB_HOST || "localhost";

      const connectionUri = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

      try {
        // 1. Validar el archivo SQL
        const validateCmd = `psql "${connectionUri}" -v ON_ERROR_STOP=1 -c "BEGIN;" -f "${SQL_PATH}" -c "ROLLBACK;"`;
        console.log("🔍 Validando archivo SQL...");
        await execPromise(validateCmd);
        console.log("✅ Archivo SQL validado correctamente.");

        // 2. Ejecutar restauración real
        const restoreCmd = `psql "${connectionUri}" -v ON_ERROR_STOP=1 -f "${SQL_PATH}"`;
        console.log("🔁 Ejecutando restauración...");
        await execPromise(restoreCmd);
        console.log("✅ Base de datos restaurada correctamente.");
      } catch (error) {
        console.error("❌ Error durante validación o restauración:");
        console.error(error.stderr || error.message);
        if (fs.existsSync(SQL_PATH)) fs.unlinkSync(SQL_PATH);
        throw new Error("Restauración fallida");
      }

      // Borrar el archivo SQL si todo salió bien
      if (fs.existsSync(SQL_PATH)) fs.unlinkSync(SQL_PATH);

      console.log("✅ Sincronización completada con éxito.");
      return true;
    }

    console.log("ℹ️ No hay nuevas versiones remotas.");
    return false;
  },
  /**
   * Sincroniza los archivos entre una estructura anidada y la base de datos remota.
   * @param {string[]} dbPaths - Array de rutas relativas desde la base de datos
   * @param {object} localStructure - Estructura anidada local generada por readNestedFolders
   * @returns {Promise<void>}
   */
  syncMediaFyles: async function syncMediaFiles(localStructure) {
    const localPaths = flattenStructure(localStructure); // ["movie/eng/file.png", ...]

    // Rutas a todos los archivos de promociónes y media
    const dbPaths = [];

    const [media, promotions] = await Promise.all([
      Multimedia.findAll({
        attributes: ["cover_path", "url_path"],
      }),
      Promotion.findAll({
        attributes: ["path", "path_secondary"],
      }),
    ]);

    media.forEach((m) => {
      if (m.cover_path) dbPaths.push(m.cover_path);
      if (m.url_path) dbPaths.push(m.url_path);
    });

    promotions.forEach((p) => {
      if (p.path) dbPaths.push(p.path);
      if (p.path_secondary) dbPaths.push(p.path_secondary);
    });

    const dbSet = new Set(dbPaths.map((p) => p.replace(/^\/+/, ""))); // Aseguramos que no empiecen con "/"
    const localSet = new Set(localPaths);

    // Descargar los archivos que están en la DB pero no en disco
    for (const dbPath of dbSet) {
      if (!localSet.has(dbPath)) {
        const fileUrl = `${MAIN_SERVER_URL}/${dbPath}`;
        const localFilePath = path.join(MEDIA_FOLDER, dbPath);

        // Verificar si ya existe físicamente
        try {
          await fs.promises.access(localFilePath, fs.constants.F_OK);
          continue; // Ya existe, no descargar
        } catch {
          // No existe, continuar con la descarga
        }

        try {
          // Crear carpeta si no existe
          await new Promise((resolve, reject) => {
            fs.mkdir(
              path.dirname(localFilePath),
              { recursive: true },
              (error) => {
                if (error) reject("Error creando carpeta");
                resolve(true);
              }
            );
          });

          const res = await axios.get(fileUrl, { responseType: "stream" });
          const writer = fs.createWriteStream(localFilePath);

          res.data.pipe(writer);

          await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });

          console.log(`📥 Descargado: ${dbPath}`);
        } catch (err) {
          console.warn(`❌ Error al descargar ${dbPath}:`, err.message);
        }
      }
    }

    // Eliminar archivos huérfanos que están en disco pero no en DB
    for (const localPath of localSet) {
      if (!dbSet.has(localPath)) {
        const fullPath = path.join(MEDIA_FOLDER, localPath);
        await fs.unlink(fullPath);
        console.log(`🗑️ Eliminado archivo huérfano: ${localPath}`);
      }
    }

    console.log("Sincronización terminada correctamente".green);
  },
  /**
   * Recorre recursivamente una lista de carpetas y archivos y devuelve
   * una estructura anidada representando el contenido.
   *
   * @param {string} basePath - Ruta base para resolver los paths completos
   * @returns {Promise<object>}
   */
  readNestedFolders: async function readNestedFolders(basePath) {
    const result = {};

    const entries = await fs.promises.readdir(basePath);

    for (const entry of entries) {
      const fullPath = path.join(basePath, entry);
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) {
        result[entry] = await readNestedFolders(fullPath); // CORRECTO
      } else {
        if (!result.files) result.files = [];
        result.files.push(entry);
      }
    }

    return result;
  },
};
