const fs = require("fs");
const path = require("path");

/**
 * Elimina los archivos subidos en caso de error.
 * @param {import("express").Request} req - Objeto de la solicitud de Express.
 */
const deleteUploadedFiles = (req) => {
  if (!req.files) return;

  ["media", "cover"].forEach((key) => {
    if (req.files[key]) {
      req.files[key].forEach((file) => {
        const filePath = path.join(
          __dirname,
          "..",
          "media",
          req.params.type,
          req.params.lang,
          file.filename
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
  });
};

module.exports = { deleteUploadedFiles };
