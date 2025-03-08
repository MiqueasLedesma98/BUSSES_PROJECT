const { validationResult } = require("express-validator");

/**
 * @template T
 * @typedef {(
 *   req: Request & T,
 *   res: Response,
 *   next: NextFunction
 * ) => void} ExpressController
 */

/**
 * @typedef {Object} propsType
 */

module.exports = {
  /**
   * @type {ExpressController<propsType>}
   */
  validateFields: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);

      const combinedErrorMessage = errorMessages.join(", ");

      return res.status(400).json({
        msg: `Validación - ${combinedErrorMessage}`,
        errors: errors.array(),
      });
    }

    next();
  },
  validateFile: (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).json({ msg: "No hay archivos" });
    }
    next();
  },
};
