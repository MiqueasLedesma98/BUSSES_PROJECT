const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { v4: uuid } = require("uuid");

// Extensiones permitidas
const allowedMimeTypes = ["video/mp4", "audio/mpeg", "image/jpeg", "image/png"];

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    const { type, lang } = req.params;

    if (!type || !lang) {
      return cb(new Error("Faltan parámetros en la ruta"), false);
    }

    const uploadPath = path.join(__dirname, "..", "media", type, lang);

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
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

// Configuración de multer con diferentes límites para imágenes y videos
const upload = multer({
  storage,
  fileFilter,
  limits: (_req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, { fileSize: 1024 * 1024 * 1024 * 10 }); // 10GB para videos
    } else {
      cb(null, { fileSize: 1024 * 1024 * 10 }); // 25MB para imágenes
    }
  },
});

module.exports = { upload };
