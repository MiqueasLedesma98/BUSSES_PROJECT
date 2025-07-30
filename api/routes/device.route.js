const { validateJWT } = require("../middlewares");

const router = require("express").Router();

const { device: controller } = require("../controllers");

router.post("/", validateJWT, controller.post);

module.exports = router;
