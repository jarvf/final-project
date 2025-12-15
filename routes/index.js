var express = require("express");
var router = express.Router();

/* GET intro page */
router.get("/", function (req, res) {
  res.render("index", { title: "Lost Data" });
});

/* GET submit page */
router.get("/submit", function (req, res) {
  res.render("submit", { title: "Submit • Lost Data" });
});

/* GET archive page */
router.get("/archive", function (req, res) {
  res.render("archive", { title: "Archive • Lost Data" });
});

module.exports = router;
