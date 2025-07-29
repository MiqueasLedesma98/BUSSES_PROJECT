const { Company, Device } = require("../models");
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
  createDevice: async (req, res, next) => {
    try {
      const { company, seat, device } = req.body;

      const company_data = await Company.findByPk(company);
    } catch (error) {
      next(error);
    }
  },
};
