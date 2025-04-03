const { deleteUploadedFiles } = require("../helpers");
const { Promotion, Company } = require("../models");
const _ = require("lodash");

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
      const { id } = req.params;

      const {
        type,
        lang,
        description,
        expirationDate: date,
        isActive,
      } = req.body;

      let expirationDate;

      if (date) {
        expirationDate = new Date(date);
      }

      const promotion = await Promotion.findByPk(id);

      if (req.files?.media) {
        const mediaPath = `/media/${type}/${lang}/${req.files.media[0]?.filename}`;
        promotion.set("path", mediaPath);
      }

      const updateData = _.pickBy(
        { type, lang, description, expirationDate, isActive },
        (value) => value !== undefined && value !== null
      );

      console.log(updateData);

      promotion.set(updateData);
      await promotion.save();

      return res.send({ msg: "Actualizado correctamente", promotion });
    } catch (error) {
      // Eliminar archivos en caso de error
      deleteUploadedFiles(req);
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
