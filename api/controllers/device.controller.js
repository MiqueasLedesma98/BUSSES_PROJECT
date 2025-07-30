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
  post: async (req, res, next) => {
    try {
      const { company, seat, bus } = req.body;

      const company_data = await Company.findByPk(company);
      if (!company_data) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }

      const existingDevice = await Device.findOne({
        where: {
          seat,
          bus,
          CompanyId: company,
        },
      });

      if (existingDevice) {
        return res.status(400).json({
          error: `Ya existe un dispositivo con asiento "${seat}" y bus "${bus}" para esta empresa.`,
        });
      }

      const newDevice = await Device.create({
        seat,
        bus,
        CompanyId: company,
      });

      return res.status(201).json(newDevice);
    } catch (error) {
      next(error);
    }
  },
};
