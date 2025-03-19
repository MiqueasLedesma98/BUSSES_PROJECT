const path = require("path");
const _ = require("lodash");
const fs = require("fs");
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
 * @property {string} [customProperty]
 * @property {string} uid - USER ID
 * @property {Object} user - User
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  post: async (req, res, next) => {
    try {
      const {
        title,
        duration,
        description = "N/A",
        categories,
        year,
        rate,
      } = req.body;
      const { type, lang } = req.params;

      const mediaPath = req.files["media"]
        ? `/media/${type}/${lang}/${req.files["media"][0].filename}`
        : null;

      const coverPath = req.files["cover"]
        ? `/media/${type}/${lang}/${req.files["cover"][0].filename}`
        : null;

      const newMedia = await Multimedia.create({
        cover_path: coverPath,
        description,
        duration,
        lang,
        rate,
        title,
        type,
        url_path: mediaPath,
        UserId: req.uid,
        year,
      });

      if (categories && categories.length > 0) {
        const categoryInstances = await Category.findAll({
          where: { id: categories },
        });

        await newMedia.addCategories(categoryInstances);
      }

      return res.status(201).json({
        msg: "Archivo subido con éxito",
        media: newMedia,
      });
    } catch (error) {
      // Eliminar archivos en caso de error
      if (req.files) {
        ["media", "cover"].forEach((key) => {
          if (req.files[key]) {
            req.files[key].forEach((file) => {
              const filePath = path.join(
                __dirname,
                "..",
                "media",
                req.params.type,
                req.params.lang,
                file.filename
              );
              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
          }
        });
      }
      next(error);
    }
  },

  /**
   * @type {ExpressController<propsType>}
   */
  put: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { type, lang } = req.params;

      const currentMedia = await Multimedia.findByPk(req.params.id);

      if (!currentMedia) throw new Error("Archivo no encontrado");

      if (req.files) {
        if (req.files["media"]) {
          const mediaPath = `/media/${type}/${lang}/${req.files["media"][0].filename}`;
          currentMedia.set({ url_path: mediaPath });
        }

        if (req.files["cover"]) {
          const coverPath = `/media/${type}/${lang}/${req.files["cover"][0].filename}`;
          currentMedia.set({ cover_path: coverPath });
        }
      }

      const updateData = _.pickBy(
        { title, description, lang, type },
        (value) => value !== undefined && value !== null
      );

      currentMedia.set(updateData);

      await currentMedia.save();

      return res.send({
        msg: "Actualizado correctamente",
        media: currentMedia,
      });
    } catch (error) {
      // Eliminar archivos en caso de error
      if (req.files) {
        ["media", "cover"].forEach((key) => {
          if (req.files[key]) {
            req.files[key].forEach((file) => {
              const filePath = path.join(
                __dirname,
                "..",
                "media",
                req.params.type,
                req.params.lang,
                file.filename
              );
              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
          }
        });
      }
      next(error);
    }
  },
};
