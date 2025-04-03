const { Op } = require("sequelize");
const { Category } = require("../models");

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
      const { lang } = req.params;
      const { limit = 10, page = 0 } = req.query;

      const where = {};

      if (lang === "all")
        where.lang = {
          [Op.in]: ["esp", "eng"],
        };
      else where.lang = lang;

      const { count, rows } = await Category.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(page) * parseInt(limit),
      });

      return res.send({ total: count, results: rows, limit, page });
    } catch (error) {
      next(error);
    }
  },
};
