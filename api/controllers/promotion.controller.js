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
      return res.send({ msg: "ok" });
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
};
