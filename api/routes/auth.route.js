const { Router } = require("express");
const router = Router();

// Lib
const { check } = require("express-validator");

// Middleware
const { validateFields } = require("../middlewares");

const { auth: controller } = require("../controllers");

router.post(
  "/login",
  [check("email", "Debe ser un email válido").isEmail(), validateFields],
  controller.login
);

module.exports = router;
