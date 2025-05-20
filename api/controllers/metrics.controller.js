const { handleList, formatForBarChart } = require("../helpers");
const { Multimedia, Promotion } = require("../models");

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
  metrics: async (req, res, next) => {
    try {
      const { collection, type } = req.params;

      const { limit = 10 } = req.query;

      let results;

      if (collection === "promotion")
        results = await Promotion.findAndCountAll({
          where: { type },
          order: [["views", "DESC"]],
          attributes: ["views", "title"],
          limit,
        });

      if (collection === "multimedia")
        results = await Multimedia.findAndCountAll({
          where: { type },
          order: [["views", "DESC"]],
          attributes: ["views", "title"],
          limit,
        });

      return res.send(formatForBarChart({ results, collection }));
    } catch (error) {
      next(error);
    }
  },
};
