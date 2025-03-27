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
    validateFields,
    upload.fields([{ name: "media", maxCount: 1 }]),
  ],
  controller.new_promotion
);

router.put(
  "/",
  [
    validateJWT,
    validateFields,
    upload.fields([{ name: "media", maxCount: 1 }]),
  ],
  controller.update_promotion
);

router.get("/:type/:lang", [validateJWT, validateFields], controller.list);

module.exports = router;
