/**
 * @template T
 * @typedef {(
 *   req: import('express').Request & T,
 *   res: import('express').Response,
 *   next: import('express').NextFunction
 * ) => void} ExpressController
 */

const { Company } = require("../models");

/**
 * @typedef {Object} propsType
 * @property {string} [customProperty] // Añade propiedades
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  post: async (req, res, next) => {
    try {
      const { name } = req.body;

      await Company.create({
        name,
      });

      return res.send({ msg: "Ok" });
    } catch (error) {
      next(error);
    }
  },
};
