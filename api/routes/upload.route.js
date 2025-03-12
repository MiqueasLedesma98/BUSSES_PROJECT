const { validateJWT, validateFields } = require("../middlewares");

const router = require("express").Router();
const { check } = require("express-validator");

const { upload: controller } = require("../controllers");

const { videoUpload } = require("../middlewares");

router.post(
  "/:type/:lang",
  [
    validateJWT,
    check("type", "Debe ser un tipo válido").isIn(["movie", "music"]),
    check("lang", "Debe ser un lenguaje válido").isIn(["esp", "eng"]),
    validateFields,
    videoUpload.single("media"),
  ],
  controller.post
);

router.put("/:id", [validateJWT], controller.put);

module.exports = router;
