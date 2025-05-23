const router = require("express").Router();

const { validateJWT, upload, validateFields } = require("../middlewares");

const { promotion: controller } = require("../controllers");
const { check } = require("express-validator");

router.post(
  "/:type/:lang",
  [
    validateJWT,
    check("type", "Debe ser un tipo válido").isIn(["banner", "video"]),
    check("lang", "Debe ser un idioma válido").isIn(["eng", "esp"]),
    // check("type_banner", "Debe ser un tipo válido").isIn([
    //   "welcome_banner",
    //   "bottom_bar",
    //   "left_bar",
    //   "carousel_banner",
    // ]),
    validateFields,
    upload.fields([
      { name: "media", maxCount: 1 },
      { name: "secondary", maxCount: 1 },
    ]),
  ],
  controller.new_promotion
);

router.put(
  "/:id",
  [
    validateJWT,
    validateFields,
    upload.fields([{ name: "media", maxCount: 1 }]),
  ],
  controller.update_promotion
);

module.exports = router;
