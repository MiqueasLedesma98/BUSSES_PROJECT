const {
  validateJWT,
  validateFields,
  upload,
  handleConversion,
  cleanupTempFiles,
} = require("../middlewares");
const router = require("express").Router();
const { check } = require("express-validator");
const { upload: controller } = require("../controllers");

router.post(
  "/:type/:lang",
  [
    validateJWT,
    check("type", "Debe ser un tipo válido").isIn(["movie", "music"]),
    check("lang", "Debe ser un lenguaje válido").isIn(["esp", "eng"]),
    validateFields,
    upload.fields([
      { name: "media", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    handleConversion, // ← Nuevo middleware para conversión
    cleanupTempFiles, // ← Middleware de limpieza
  ],
  controller.post
);

router.put(
  "/:id",
  [
    validateJWT,
    check("type", "Debe ser un tipo válido").isIn(["movie", "music"]),
    check("lang", "Debe ser un lenguaje válido").isIn(["esp", "eng"]),
    validateFields,
    upload.single("media"),
    handleConversion, // ← Nuevo middleware para conversión
    cleanupTempFiles, // ← Middleware de limpieza
  ],
  controller.put
);

router.delete("/:id", [validateJWT], controller.delete);

module.exports = router;
