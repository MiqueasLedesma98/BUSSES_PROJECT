const router = require("express").Router();

router.get("/:type/:lang", (_req, res, _next) => {
  res.send({ msg: "Listado de archivos" });
});

module.exports = router;
