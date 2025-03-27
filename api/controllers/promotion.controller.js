const { Promotion, Company } = require("../models");

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
  new_promotion: async (req, res, next) => {
    try {
      const { description, expirationDate, company } = req.body;
      const { type, lang } = req.params;

      const { media } = req.files;

      const filePath = `/media/${type}/${lang}/${media[0]?.filename}`;

      const newPromotion = await Promotion.create({
        path: filePath,
        type,
        lang,
        expirationDate: new Date(expirationDate),
        description,
      });

      const currentCompany = await Company.findByPk(company);
      if (currentCompany) await newPromotion.addCompany(currentCompany);

      return res.send({
        msg: "Promoción guardada correctamente",
        newPromotion,
      });
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  update_promotion: async (req, res, next) => {
    try {
      return res.send({ msg: "ok" });
    } catch (error) {
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  list: async (req, res, next) => {
    try {
      const { type, lang } = req.params;
      const { limit = 10, skip: page = 0 } = req.query;

      const results = await Promotion.findAndCountAll({
        where: { type, lang },
        offset: parseInt(page) * parseInt(limit),
        limit: parseInt(limit),
      });

      return res.send({
        total: results.count,
        results: results.rows,
        limit: parseInt(limit),
        page: parseInt(page),
      });
    } catch (error) {
      next(error);
    }
  },
};
