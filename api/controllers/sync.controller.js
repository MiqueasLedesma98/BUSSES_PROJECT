/**
 * @template T
 * @typedef {(
 *   req: import('express').Request & T,
 *   res: import('express').Response,
 *   next: import('express').NextFunction
 * ) => void} ExpressController
 */

const { Multimedia, Promotion } = require("../models");

/**
 * @typedef {Object} propsType
 * @property {string} [customProperty] // Añade propiedades específicas si es necesario
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  firstSync: async (_req, res, next) => {
    try {
      const [multimedias, promotions] = await Promise.all([
        Multimedia.findAll(),
        Promotion.findAll(),
      ]);

      res.send({ multimedias, promotions });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  sync: async (_req, res, next) => {
    try {
      const result = await Multimedia.findAll();

      res.send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
