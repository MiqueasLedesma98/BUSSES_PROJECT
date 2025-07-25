const { axios } = require("../lib/axios");
const fs = require("fs");
const {
  Version,
  User,
  Multimedia,
  Category,
  Bus,
  Company,
  Promotion,
  Device,
} = require("../models");
const { sequelize } = require("../config/db");
const path = require("path");
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL;

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
    Device.findAll({
      attributes: ["state", "id"],
    }),
  ]);

  return { multimedias, promotions, devices };
}

async function resetAndImportDatabase(data) {
  const transaction = await sequelize.transaction();
  try {
    await sequelize.sync({ force: true, transaction });

    await Promise.all(
      data.users.map((user) => User.create(user, { transaction, hooks: false }))
    );

    await Promise.all(
      data.multimedia.map((media) => Multimedia.create(media, { transaction }))
    );
    await Promise.all(
      data.category.map((category) =>
        Category.create(category, { transaction })
      )
    );
    await Promise.all(data.Bus.map((bus) => Bus.create(bus, { transaction })));

    await Promise.all(
      data.companies.map((company) => Company.create(company, { transaction }))
    );

    await Promise.all(
      data.promotions.map((promotion) =>
        Promotion.create(promotion, { transaction })
      )
    );

    await Promise.all(
      data.devices.map((device) => Device.create(device, { transaction }))
    );

    await Version.create({ number: data.versionNumber }, { transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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

    if (!localVersion || remoteVersion.number > localVersion.number) {
      const { data: backup } = await axios.get("/version/backup");

      const formatBackupData = (backup) => ({
        users: backup.User,
        multimedia: backup.Multimedia,
        category: backup.Category,
        Bus: backup.Bus,
        companies: backup.Company,
        promotions: backup.Promotion,
        devices: backup.Device,
        versionNumber: backup.Version?.number || 1,
      });

      await resetAndImportDatabase(formatBackupData(backup));

      return true;
    } else return false;
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
