const router = require("express").Router();

const { version: controller } = require("../controllers");

const { validateJWT } = require("../middlewares");

router.get("/", [validateJWT], controller.getVersion);

router.post("/", [validateJWT], controller.createVersion);

module.exports = router;
