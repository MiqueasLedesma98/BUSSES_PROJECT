const router = require("express").Router();

const { sync: controller } = require("../controllers");

const { validateJWT } = require("../middlewares/validate-jwt");

router.post("/", [validateJWT], controller.sync);

router.post("/first", [validateJWT], controller.firstSync);

module.exports = router;
