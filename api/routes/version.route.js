const router = require("express").Router();

const NODE_ENV = process.env.NODE_ENV;

const { version: controller } = require("../controllers");

const { validateJWT } = require("../middlewares");

if (NODE_ENV === "MAIN_SERVER" || "DEV") {
  router.get("/", [validateJWT], controller.getVersion);

  router.post("/", [validateJWT], controller.createVersion);

  router.get("/backup", [validateJWT], controller.backup);
}

module.exports = router;
