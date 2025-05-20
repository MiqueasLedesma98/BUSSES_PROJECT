const router = require("express").Router();

const { validateJWT, validateFields } = require("../middlewares");

const { metrics: controller } = require("../controllers");

router.get("/:collection/:type", [validateJWT, validateFields], controller.metrics);

module.exports = router;
