const router = require("express").Router();
const { check } = require("express-validator");

const { media: controller } = require("../controllers");
const { validateFields } = require("../middlewares");

router.get(
  "/:type/:lang/:name",
  [
    check("type", "No es un typo válido").isIn(["banner", "movie", "video"]),
    check("lang", "No es un lenguaje válido").isIn(["esp", "eng"]),
    check("name", "Name es obligatorio").notEmpty(),
    validateFields,
  ],
  controller.show
);

module.exports = router;
