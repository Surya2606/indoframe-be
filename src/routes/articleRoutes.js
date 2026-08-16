const express = require("express");
const router = express.Router();

// Mengambil dari folder controllers yang ada di dalam src/
const articleController = require("../controllers/articleController");

// Route GET (Ambil semua artikel)
router.get("/", (req, res, next) => articleController.getAllArticles(req, res, next));

// Route POST (Simpan artikel baru) -- TAMBAHKAN BARIS INI!
router.post("/", (req, res, next) => articleController.createArticle(req, res, next));

module.exports = router;
