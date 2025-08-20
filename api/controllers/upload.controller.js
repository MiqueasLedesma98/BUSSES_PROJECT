const _ = require("lodash");
const { Multimedia, Category } = require("../models");
const { deleteUploadedFiles, deleteFile } = require("../helpers");
const fs = require('fs');

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
        rate = 0,
      } = req.body;
      const { type, lang } = req.params;

      // Verificar que los archivos existen después de la conversión
      if (!req.files || !req.files["media"] || !req.files["media"][0]) {
        return res.status(400).json({
          error: "Archivo de media es requerido",
        });
      }

      const mediaFile = req.files["media"][0];
      const coverFile = req.files["cover"] ? req.files["cover"][0] : null;

      // Verificar que los archivos convertidos existen
      if (!fs.existsSync(mediaFile.path)) {
        throw new Error(
          "Archivo de media no encontrado después de la conversión"
        );
      }

      if (coverFile && !fs.existsSync(coverFile.path)) {
        throw new Error(
          "Archivo de cover no encontrado después de la conversión"
        );
      }

      const mediaPath = `/media/${type}/${lang}/${mediaFile.filename}`;
      const coverPath = coverFile
        ? `/media/${type}/${lang}/${coverFile.filename}`
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
        year,
      });

      if (categories && categories.length > 0) {
        const categoryInstances = await Category.findAll({
          where: { id: categories },
        });
        await newMedia.addCategories(categoryInstances);
      }

      return res.status(201).json({
        msg: "Archivo subido y convertido con éxito",
        media: newMedia,
      });
    } catch (error) {
      // Eliminar archivos en caso de error
      deleteUploadedFiles(req);
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
      deleteUploadedFiles(req);
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleted = await Multimedia.findByPk(id);

      if (deleted) {
        await deleted.destroy();

        deleteFile(deleted.url_path);
        deleteFile(deleted.cover_path);
      }

      res.send({ msg: "ok" });
    } catch (error) {
      next(error);
    }
  },
};
