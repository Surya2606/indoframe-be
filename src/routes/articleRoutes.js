const express = require("express");
const router = express.Router();

// Mengambil dari folder controllers yang ada di dalam src/
const articleController = require("../controllers/articleController");

router.get("/", (req, res, next) => articleController.getAllArticles(req, res, next));

module.exports = router;
