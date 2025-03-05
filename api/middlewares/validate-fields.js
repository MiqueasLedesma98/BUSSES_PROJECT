const { validationResult } = require("express-validator");

module.exports = {
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
