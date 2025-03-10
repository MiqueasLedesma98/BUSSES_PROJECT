const path = require("path");
const fs = require("fs");
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
  stream: async (req, res, next) => {
    try {
      const range = req.headers.range;

      if (!range) throw new Error("Requires range header");

      const videoPath = path.join(
        __dirname,
        "..",
        "media",
        req.params.folder,
        req.params.lang,
        req.params.name
      );

      const exists = fs.existsSync(videoPath);

      if (!exists) return res.status(404).send({ msg: "Archivo no existe" });

      const videoSize = fs.statSync(videoPath).size;

      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      const contentLength = end - start + 1;

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // Estado HTTP 206 para Contenido Parcial
      res.writeHead(206, headers);

      // crear una transmisión de lectura de video para este fragmento en particular
      const videoStream = fs.createReadStream(videoPath, { start, end });

      videoStream.on("error", (error) => {
        console.error("Error en el stream: ", error);
        res.status(500).send({
          msg: `Error durante transmisión de video ${req.params.name} - lang: ${req.params.lang}`,
        });
      });

      // Transmitir el fragmento de video al cliente
      videoStream.pipe(res);
    } catch (error) {
      next(error);
    }
  },
};
