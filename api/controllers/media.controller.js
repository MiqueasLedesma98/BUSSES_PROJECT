const path = require("path");
const fs = require("fs");

const defaultFile = path.join(__dirname, "..", "assets", "no-image.png");

// Función para determinar Content-Type
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const contentTypes = {
    ".mp4": "video/mp4",
    ".m4v": "video/mp4",
    ".mov": "video/quicktime",
    ".webm": "video/webm",
    ".mkv": "video/x-matroska",
    ".avi": "video/x-msvideo",
    ".m3u8": "application/x-mpegURL",
    ".ts": "video/MP2T",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };

  return contentTypes[ext] || "application/octet-stream";
}

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
  show: async (req, res, next) => {
    try {
      const { type, lang, name } = req.params;

      // Construir ruta segura
      const safePath = path.join(__dirname, "..", "media", type, lang, name);

      // Verificar que el archivo existe
      if (!fs.existsSync(safePath)) {
        res.sendFile(defaultFile);
        return;
      }

      // Obtener estadísticas del archivo
      const stat = fs.statSync(safePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      // Si no hay header Range, servir archivo completo
      if (!range) {
        const headers = {
          "Content-Length": fileSize,
          "Content-Type": getContentType(name),
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=31536000",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "Content-Length,Content-Range",
        };
        res.writeHead(200, headers);
        fs.createReadStream(safePath).pipe(res);
        return;
      }

      // Procesar header Range para streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      // Headers para respuesta parcial
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": getContentType(name),
        "Cache-Control": "public, max-age=31536000",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "Content-Length,Content-Range",
      };

      // HTTP 206 for Partial Content
      res.writeHead(206, headers);

      // Crear stream del segmento solicitado
      const stream = fs.createReadStream(safePath, { start, end });
      stream.pipe(res);
    } catch (error) {
      console.error("Error serving file:", error);

      // Enviar error específico para video
      if (req.headers.range) {
        res.status(416).send("Range Not Satisfiable");
      } else {
        res.sendFile(defaultFile);
      }
    }
  },
};
