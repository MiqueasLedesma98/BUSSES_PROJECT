const router = require("express").Router();

const { view: controller } = require("../controllers");

const { validateJWT } = require("../middlewares");

router.put("/:id", [validateJWT], controller.increment);

module.exports = router;
