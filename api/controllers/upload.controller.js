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
      console.log({ fileName: req.file.originalname });

      return res.send({ msg: "ok" });
    } catch (error) {
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
