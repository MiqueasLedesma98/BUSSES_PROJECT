const path = require("path");
const fs = require("fs");

const defaultFile = path.join(__dirname, "..", "assets", "no-image.png");

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
  show: async (req, res, next) => {
    try {
      const { type, lang, name } = req.params;

      // Construir ruta segura
      const safePath = path.join(__dirname, "..", "media", type, lang, name);

      // Verificar que el archivo existe
      const exists = fs.existsSync(safePath);

      if (!exists) {
        res.sendFile(defaultFile);
        return;
      }

      // Configurar headers y enviar el archivo
      res.sendFile(safePath, {
        headers: {
          "Cache-Control": "public, max-age=3153600", // Cache por 1 año
        },
      });
    } catch (error) {
      console.error("Error serving file:", error);
      next(error);
    }
  },
};
