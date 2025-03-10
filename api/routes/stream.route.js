const router = require("express").Router();

const { validateJWT, validateFields } = require("../middlewares");

const { stream: controller } = require("../controllers");
const { check } = require("express-validator");

router.get(
  "/:folder/:lang/:name",
  [
    // validateJWT,
    check("folder", "No es carpeta válida").isIn(["movie", "promotion"]),
    check("lang", "No es un lenguaje válido").isIn(["esp", "lang"]),
    validateFields,
  ],
  controller.stream
);

module.exports = router;
