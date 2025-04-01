const { Multimedia, Category } = require("../models");

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
 * @property {string} [customProperty] // Añade propiedades
 */
module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  list: async (req, res, next) => {
    try {
      const { type, lang } = req.params;
      const { limit = 10, page = 1 } = req.query;

      const formatPage = parseInt(page) - 1;

      const where = {
        type,
        lang: lang === "all" ? ["esp", "eng"] : lang,
      };

      const results = await Multimedia.findAndCountAll({
        offset: parseInt(limit) * formatPage,
        limit: parseInt(limit),
        where,
        include: [
          {
            model: Category,
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      return res.send({
        total: results.count,
        results: results.rows,
        limit,
        page,
      });
    } catch (error) {
      next(error);
    }
  },
};
