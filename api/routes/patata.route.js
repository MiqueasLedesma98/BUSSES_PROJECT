const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  console.log(req.body);

  return res.send("patata");
});

module.exports = router;
