/**
 * @template T
 * @typedef {(
 *   req: import('express').Request & T,
 *   res: import('express').Response,
 *   next: import('express').NextFunction
 * ) => void} ExpressController
 */

const { Promotion, Multimedia } = require("../models");

/**
 * @typedef {Object} propsType
 * @property {string} [customProperty] // Añade propiedades específicas si es necesario
 */
module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  increment: async (req, res, next) => {
    try {
      const [promotion, media] = await Promise.all([
        Promotion.findByPk(req.params.id),
        Multimedia.findByPk(req.params.id),
      ]);

      if (media) {
        await media.save();
        return res.send(true);
      }

      if (promotion) {
        await promotion.save();
        return res.send(true);
      }

      throw new Error("Resource not founded");
    } catch (error) {
      next(error);
    }
  },
};
