const router = require("express").Router();

const { validateJWT, upload, validateFields } = require("../middlewares");

const { promotion: controller } = require("../controllers");

router.post(
  "/",
  [
    validateJWT,
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

module.exports = router;
