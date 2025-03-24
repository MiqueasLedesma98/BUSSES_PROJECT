const router = require("express").Router();

const { sync: controller } = require("../controllers");

router.post("/", controller.firstSync);

module.exports = router;
