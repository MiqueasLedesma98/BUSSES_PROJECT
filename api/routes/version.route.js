const router = require("express").Router();

const NODE_ENV = process.env.NODE_ENV;

const { version: controller } = require("../controllers");

const { validateJWT } = require("../middlewares");

router.get("/", [validateJWT], controller.getVersion);

router.post("/", [validateJWT], controller.createVersion);

router.get("/backup", [validateJWT], controller.backup);

router.get("/renew", [validateJWT], controller.renew);

router.put("/sync", [validateJWT], controller.sync);

module.exports = router;
