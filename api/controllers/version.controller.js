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
      const incoming = req.body;

      // TODO: agregar la diferencia de vistas en promotions y multimedia
      return res.json({ msg: "Success" });
    } catch (error) {
      next(error);
    }
  },
};
