const router = require("express").Router();

const { check } = require("express-validator");
const { list: controller } = require("../controllers");

const { validateJWT, validateFields } = require("../middlewares");

router.get(
  "/media/:type/:lang",
  [
    validateJWT,
    check("type", "No es un tipo válido").isIn(["movie", "music"]),
    check("lang", "No es una lenguaje válido").isIn(["esp", "eng", "all"]),
    validateFields,
  ],
  controller.media
);

router.get(
  "/promotion/:type/:lang",
  [
    validateJWT,
    check("type", "No es un tipo válido").isIn(["banner", "video"]),
    check("lang", "No es una lenguaje válido").isIn(["esp", "eng", "all"]),
    validateFields,
  ],
  controller.promotion
);

router.get(
  "/category/:type/:lang",
  [validateJWT, validateFields],
  controller.category
);

module.exports = router;
