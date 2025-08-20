const fs = require("fs");
const path = require("path");

/**
 * Elimina los archivos subidos en caso de error.
 * @param {import("express").Request} req - Objeto de la solicitud de Express.
 */
function deleteUploadedFiles(req) {
  try {
    // Eliminar archivos individuales
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Eliminar múltiples archivos
    if (req.files) {
      for (const fieldName in req.files) {
        for (const file of req.files[fieldName]) {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error limpiando archivos:", error);
  }
}

/**
 * Eliminar un archivo usando una ruta
 * @param {string} pathFile
 */
const deleteFile = (pathFile) => {
  const filePath = path.join(__dirname, "..", pathFile);

  if (fs.existsSync(filePath))
    fs.unlink(filePath, (err) => {
      if (err) throw new Error("Ocurrió en error al eliminar el archivo");
      else return true;
    });
};

module.exports = { deleteUploadedFiles, deleteFile };
