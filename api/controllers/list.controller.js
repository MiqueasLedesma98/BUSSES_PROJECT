const { Sequelize } = require("sequelize");
const { Multimedia, Category, Promotion } = require("../models");

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
  media: async (req, res, next) => {
    try {
      const { type, lang } = req.params;
      const { limit = 10, page = 1, sort = "createdAt:DESC" } = req.query;

      const formatPage = parseInt(page) - 1;
      const where = {
        type,
        lang: lang === "all" ? ["esp", "eng"] : lang,
      };

      const parsedLimit = parseInt(limit);
      let order;

      if (sort) {
        const [field, direction = "ASC"] = sort.split(":");

        // Si el campo es 'year' y es string, casteamos a número
        if (field === "year") {
          order = Sequelize.literal(
            `"${field}"::integer ${direction.toUpperCase()}`
          );
        } else {
          order = [[field, direction.toUpperCase()]];
        }
      } else {
        order = [["createdAt", "DESC"]]; // fallback
      }

      const results = await Multimedia.findAndCountAll({
        offset: parsedLimit * formatPage,
        limit: parsedLimit,
        order,
        where,
        include: [
          {
            model: Category,
          },
        ],
      });

      return res.send({
        total: results.count,
        results: results.rows,
        limit: parsedLimit,
        page: parseInt(page),
      });
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  promotion: async (req, res, next) => {
    try {
      const { type, lang } = req.params;
      const { type_banner, limit = 0, sort } = req.query;

      const where = { type, lang };
      if (type_banner !== "none") where.type_banner = type_banner;

      const options = { where };

      if (sort) {
        const [field, direction = "ASC"] = sort.split(":");

        if (field === "year") {
          options.order = Sequelize.literal(
            `"${field}"::integer ${direction.toUpperCase()}`
          );
        } else {
          options.order = [[field, direction.toUpperCase()]];
        }
      } else {
        options.order = Sequelize.literal("RANDOM()");
      }

      if (parseInt(limit)) {
        options.limit = parseInt(limit, 10);
        const randomPromotions = await Promotion.findAll(options);
        return res.send(randomPromotions);
      } else {
        const randomPromotion = await Promotion.findOne(options);
        return res.send(randomPromotion);
      }
    } catch (error) {
      next(error);
    }
  },
};
