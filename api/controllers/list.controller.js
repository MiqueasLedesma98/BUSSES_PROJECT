/**
 * @template T
 * @typedef {(
 *   req: import('express').Request & T,
 *   res: import('express').Response,
 *   next: import('express').NextFunction
 * ) => void} ExpressController
 */

const { Multimedia } = require("../models");

/**
 * @typedef {Object} propsType
 * @property {string} [customProperty] // Añade propiedades
 */
module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  list: async (req, res, next) => {
    try {
      const { type, lang } = req.params;
      const { limit = 10, page = 0 } = req.query;

      const results = await Multimedia.findAndCountAll({
        offset: limit * page,
        limit: parseInt(limit),
        where: { type, lang },
        include: ["categories"],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      return res.send(results);
    } catch (error) {
      next(error);
    }
  },
};
