const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { v4: uuid } = require("uuid");

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileName = `${uuid()}${extension}`;
    cb(null, fileName);
  },
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

// Configuración de multer
const videoUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 * 10, // 10GB
  },
  fileFilter,
});

module.exports = { videoUpload };
