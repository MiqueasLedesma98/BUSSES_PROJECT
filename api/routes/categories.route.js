const router = require("express").Router();

const { validateJWT } = require("../middlewares");

const { categories: controller } = require("../controllers");

router.get("/:lang", [validateJWT], controller.list);

module.exports = router;
