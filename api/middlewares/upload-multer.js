const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "..", "media", req.params.type, req.params.lang)
    );
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    cb(null, `${uuid()}.${extension}`); // Nombre del archivo
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
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 * 10, // 10GB
  },
  fileFilter: fileFilter,
});

module.exports = { videoUpload };
