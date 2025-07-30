const router = require("express").Router();

const { check } = require("express-validator");
const { company: controller } = require("../controllers");

const { validateJWT, validateFields } = require("../middlewares");

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    validateFields,
  ],
  controller.post
);

router.get("/", validateJWT, controller.get);

module.exports = router;
