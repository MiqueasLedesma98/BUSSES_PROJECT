const router = require("express").Router();

const { check } = require("express-validator");
const { list: controller } = require("../controllers");

const { validateJWT, validateFields } = require("../middlewares");

router.get(
  "/:type/:lang",
  [
    validateJWT,
    check("type", "No es un tipo válido").isIn(["movie", "music"]),
    check("lang", "No es una lenguaje válido").isIn(["esp", "eng"]),
    validateFields,
  ],
  controller.list
);

module.exports = router;
