/**
 * @template T
 * @typedef {(
 *   req: import('express').Request & T,
 *   res: import('express').Response,
 *   next: import('express').NextFunction
 * ) => void} ExpressController
 */

const { User, Multimedia } = require("../models");

/**
 * @typedef {Object} propsType
 * @property {string} [customProperty] // Añade propiedades específicas si es necesario
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  firstSync: async (req, res, next) => {
    try {
      const result = await Multimedia.findAll({
        attributes: ["title", "description", "cover_path", "url_path", "id"],
      });

      res.send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
