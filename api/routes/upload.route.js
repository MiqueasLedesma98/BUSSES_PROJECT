const { validateJWT, validateFields } = require("../middlewares");

const router = require("express").Router();
const { check } = require("express-validator");

const { upload: controller } = require("../controllers");

const { upload } = require("../middlewares");

router.post(
  "/:type/:lang",
  [
    validateJWT,
    check("type", "Debe ser un tipo válido").isIn(["movie", "music"]),
    check("lang", "Debe ser un lenguaje válido").isIn(["esp", "eng"]),
    // DEBUG
    // (req, _res, next) => {
    //   console.log(req.body.media, req.body.cover);
    //   next();
    // },
    validateFields,
    upload.fields([
      { name: "media", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
  ],
  controller.post
);

router.put(
  "/:id",
  [
    validateJWT,
    check("type", "Debe ser un tipo válido").isIn(["movie", "music"]),
    check("lang", "Debe ser un lenguaje válido").isIn(["esp", "eng"]),
    // check("media", "El archivo es obligatorio").not().isEmpty(),
    validateFields,
    upload.single("media"),
  ],
  controller.put
);

module.exports = router;
