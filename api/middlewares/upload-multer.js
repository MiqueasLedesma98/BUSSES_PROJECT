const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

// Configurar path de FFmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// Extensiones permitidas (ampliadas para incluir formatos que convertiremos)
const allowedMimeTypes = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
  "video/webm",
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/flac",
  "audio/ogg",
  "audio/x-m4a",
  "image/jpeg",
  "image/png",
];

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    const { type, lang } = req.params;

    if (!type || !lang) {
      return cb(new Error("Faltan parámetros en la ruta"), false);
    }

    const uploadPath = path.join(__dirname, "..", "media", type, lang);
    const tempPath = path.join(__dirname, "..", "temp", type, lang);

    // Crear carpetas si no existen
    [uploadPath, tempPath].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    cb(null, tempPath); // Guardar primero en temp para conversión
  },
  filename: function (_req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileName = `${uuid()}${extension}`;
    cb(null, fileName);
  },
});

// Filtro de archivos
const fileFilter = (_req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

// Función para convertir archivos a formatos compatibles
async function convertToCompatibleFormat(tempPath, finalPath, mimeType) {
  return new Promise((resolve, reject) => {
    try {
      if (mimeType.startsWith("video/")) {
        // Conversión de video a MP4 compatible
        ffmpeg(tempPath)
          .videoCodec("libx264")
          .audioCodec("aac")
          .outputOptions([
            "-preset ultrafast",
            "-crf 23",
            "-maxrate 1000k",
            "-bufsize 2000k",
            "-pix_fmt yuv420p",
            "-profile:v baseline",
            "-level 3.0",
            "-movflags +faststart",
          ])
          .on("end", () => {
            fs.unlinkSync(tempPath); // Eliminar archivo temporal
            resolve(finalPath);
          })
          .on("error", (err) => {
            fs.unlinkSync(tempPath); // Limpiar en caso de error
            reject(err);
          })
          .save(finalPath);
      } else if (mimeType.startsWith("audio/")) {
        // Conversión de audio a MP3 compatible
        ffmpeg(tempPath)
          .audioCodec("libmp3lame")
          .audioBitrate("128k")
          .audioChannels(2)
          .audioFrequency(44100)
          .outputOptions(["-acodec mp3", "-ar 44100", "-sample_fmt s16p"])
          .on("end", () => {
            fs.unlinkSync(tempPath);
            resolve(finalPath);
          })
          .on("error", (err) => {
            fs.unlinkSync(tempPath);
            reject(err);
          })
          .save(finalPath.replace(/\.[^/.]+$/, ".mp3")); // Forzar extensión .mp3
      } else {
        // Para imágenes, solo mover del temp al destino final
        fs.renameSync(tempPath, finalPath);
        resolve(finalPath);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Middleware personalizado para manejar la conversión
const handleConversion = (req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    try {
      if (req.file && req.file.path) {
        const { type, lang } = req.params;
        const tempPath = req.file.path;
        const originalExtension = path.extname(req.file.originalname);
        const fileName = path.basename(tempPath);

        // Ruta final donde se guardará el archivo convertido
        const finalPath = path.join(
          __dirname,
          "..",
          "media",
          type,
          lang,
          fileName
        );

        // Convertir el archivo
        convertToCompatibleFormat(tempPath, finalPath, req.file.mimetype)
          .then((finalFilePath) => {
            // Actualizar la información del archivo en req.file
            req.file.path = finalFilePath;
            req.file.filename = path.basename(finalFilePath);
            req.file.originalname = path.basename(finalFilePath);

            // Llamar al send original
            oldSend.call(this, data);
          })
          .catch((error) => {
            console.error("Error en conversión:", error);
            oldSend.call(this, {
              error: "Error al convertir el archivo",
              details: error.message,
            });
          });
      } else {
        oldSend.call(this, data);
      }
    } catch (error) {
      oldSend.call(this, {
        error: "Error en el proceso de conversión",
        details: error.message,
      });
    }
  };
  next();
};

// Configuración de multer
const upload = multer({
  storage,
  fileFilter,
  limits: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, { fileSize: 1024 * 1024 * 1024 * 10 }); // 10GB para videos
    } else {
      cb(null, { fileSize: 1024 * 1024 * 10 }); // 10MB para otros archivos
    }
  },
});

// Middleware para limpieza de archivos temporales en caso de error
const cleanupTempFiles = (req, res, next) => {
  const cleanup = () => {
    if (req.file && req.file.path) {
      const tempDir = path.dirname(req.file.path);
      // Eliminar archivo temporal si existe
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      // Intentar eliminar directorio temp si está vacío
      try {
        if (fs.readdirSync(tempDir).length === 0) {
          fs.rmdirSync(tempDir);
        }
      } catch (error) {
        // Ignorar error si el directorio no está vacío
      }
    }
  };

  // Limpiar en caso de error
  res.on("finish", cleanup);
  res.on("close", cleanup);

  next();
};

module.exports = {
  upload,
  handleConversion,
  cleanupTempFiles,
  convertToCompatibleFormat,
};
