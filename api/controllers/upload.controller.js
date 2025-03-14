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
 * @property {string} [customProperty] // Añade propiedades específicas si es necesario
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  post: async (req, res, next) => {
    try {
      const { title, duration, description = "N/A", categories } = req.body;
      const { type, lang } = req.params;

      const url_path = `/media/${type}/${lang}/${req.file?.filename}`;

      const newMedia = await Multimedia.create({
        description,
        duration,
        lang,
        title,
        type,
        url_path,
        UserId: req.uid,
      });

      if (categories && categories.length > 0) {
        const categoryInstances = await Category.findAll({
          where: { id: categories },
        });

        await newMedia.addCategories(categoryInstances);
      }

      return res
        .status(201)
        .json({ msg: "Archivo subido con éxito", media: newMedia });
    } catch (error) {
      if (req.file) {
        const filePath = path.join(
          __dirname,
          "..",
          "media",
          req.params.type,
          req.params.lang,
          req.file.filename
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      next(error);
    }
  },
  /**
   * @type {ExpressController<propsType>}
   */
  put: async (req, res, next) => {
    try {
      return res.send({ msg: "ok" });
    } catch (error) {
      next(error);
    }
  },
};
