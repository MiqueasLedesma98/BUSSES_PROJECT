const { Sequelize, Op } = require("sequelize");
const { Multimedia, Category, Promotion, Company } = require("../models");
const { handleList } = require("../helpers");

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
      const {
        limit = 10,
        page = 1,
        sort = "createdAt:DESC",
        search,
        category,
      } = req.query;

      const formatPage = parseInt(page) - 1;

      const where = {
        type,
        lang: lang === "all" ? ["esp", "eng"] : lang,
      };

      const nestedWhere = {};

      const parsedLimit = parseInt(limit);
      let order;

      if (search)
        where.title = {
          [Op.iLike]: `%${search}%`,
        };

      if (category) nestedWhere.id = category;

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

      const [test] = await Multimedia.findAll();

      const results = await Multimedia.findAndCountAll({
        offset: parsedLimit * formatPage,
        limit: parsedLimit,
        order,
        where,
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            where: nestedWhere,
          },
        ],
      });

      return res.send(handleList({ limit, page, results }));
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
      const { type_banner, limit = 0, sort, page = 0 } = req.query;

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
        const { count, rows } = await Promotion.findAndCountAll(options);
        return res.send({ total: count, results: rows, limit, page });
      } else {
        const randomPromotion = await Promotion.findOne(options);
        return res.send(randomPromotion);
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  category: async (req, res, next) => {
    try {
      const { type, lang } = req.params;
      const { name } = req.query;

      const where = {
        type,
        lang,
      };

      if (name) where.name = Op.iLike(name);

      const results = await Category.findAndCountAll({
        where,
        attributes: ["id", "name"],
        order: Sequelize.literal("RANDOM()"),
      });

      return res.send(handleList({ results }));
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  companies: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page) - 1;

      const results = await Company.findAndCountAll({
        offset: parsedLimit * parsedPage,
        limit: parsedLimit,
      });

      return res.send(handleList({ results, limit, page }));
    } catch (error) {
      next(error);
    }
  },
};
