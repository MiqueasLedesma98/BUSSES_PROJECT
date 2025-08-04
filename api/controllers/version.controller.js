require("colors");
const { Op } = require("sequelize");
const { Version, ...models } = require("../models");
const { exec } = require("child_process");
const path = require("path");

/**
 * @template T
 * @typedef {(
 *   req: import('express').Request & T,
 *   res: import('express').Response,
 *   next: import('express').NextFunction
 * ) => void} ExpressController
 */

/**
 * @typedef {Object} propsType
 * @property {string} [customProperty] // Añade propiedades específicas si es necesario
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  getVersion: async (_req, res, next) => {
    try {
      let version = await Version.findOne({
        order: [["number", "DESC"]],
      });

      if (!version) {
        version = await Version.create({
          number: 1,
        });
      }

      return res.send(version);
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  createVersion: async (_req, res, next) => {
    try {
      const fixedId = "00000000-0000-0000-0000-000000000001";

      const latestVersion = await Version.findOne({
        order: [["number", "DESC"]],
      });

      const nextNumber = latestVersion?.number ? latestVersion.number + 1 : 1;

      await Version.upsert({
        id: fixedId,
        number: nextNumber,
      });

      return res.send(true);
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  backup: async (_req, res, next) => {
    try {
      const DB_NAME = process.env.DB_NAME;
      const DB_USER = process.env.DB_USER;
      const DB_PASS = process.env.DB_PASS;
      const HOST = "localhost";

      const SQL_PATH = path.join(__dirname, "..", "backup.sql");

      const dumpCommand = `PGPASSWORD="${DB_PASS}" pg_dump --clean -U ${DB_USER} -h ${HOST} -d ${DB_NAME} -F p > "${SQL_PATH}"`;

      exec(dumpCommand, (error, _stdout, stderr) => {
        if (error) {
          console.error("Error al crear backup:", stderr);
          return next(error);
        }

        console.log("✅ Backup creado correctamente:", SQL_PATH);
        return res.download(SQL_PATH); // ✅ Envía el archivo al cliente
      });
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  sync: async (req, res, next) => {
    try {
      const { multimedias = [], promotions = [], devices = [] } = req.body;

      // 1. Devices: hacer bulkCreate con updateOnDuplicate
      if (devices?.length) {
        await models.Device.bulkCreate(devices, {
          updateOnDuplicate: Object.keys(devices[0] || {}), // asegura que actualiza todos los campos
        });
      }

      // 2. Multimedia: actualizar vistas
      for (const { id, view } of multimedias) {
        await models.Multimedia.increment(
          { views: parseInt(view) },
          { where: { id } }
        );
      }

      // 3. Promociones: actualizar vistas
      for (const { id, view } of promotions) {
        await models.Promotion.increment(
          { views: parseInt(view) },
          { where: { id } }
        );
      }

      return res.json({ msg: "Success" });
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  renew: async (_req, res, next) => {
    try {
      let version = await Version.findOne({ order: [["createdAt", "DESC"]] });

      if (!version) {
        version = await Version.create({
          number: 1,
        });
      }

      const versionDate = version?.createdAt;

      const results = await Promise.all(
        Object.values(models).map(
          async (model) =>
            await model.findOne({
              where: { createdAt: { [Op.gt]: versionDate } },
            })
        )
      );

      const haveAndUpdate = results.some((item) => item);

      return res.send({ new: haveAndUpdate });
    } catch (error) {
      next(error);
    }
  },
};
