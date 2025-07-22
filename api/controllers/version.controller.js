const { Op } = require("sequelize");
const { Version, ...models } = require("../models");

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
      const newVersion = await Version.create();

      return res.send();
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  backup: async (_req, res, next) => {
    try {
      const allData = {};

      await Promise.all(
        Object.keys(models).map(async (key) => {
          allData[key] = await models[key].findAll({ raw: true });
        })
      );

      return res.json(allData);
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
        await models.Multimedia.increment({ views: view }, { where: { id } });
      }

      // 3. Promociones: actualizar vistas
      for (const { id, view } of promotions) {
        await models.Promotion.increment({ views: view }, { where: { id } });
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
