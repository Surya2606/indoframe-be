const articleService = require("../services/articleService");

class ArticleController {
  async getAllArticles(req, res, next) {
    try {
      const search = req.query.search || req.query.q || "";

      // Memanggil layer Service
      const articles = await articleService.getArticles(search);

      return res.status(200).json({
        status: "success",
        total: articles.length,
        data: articles,
      });
    } catch (error) {
      // Lempar ke Middleware Error Handler
      next(error);
    }
  }

  // TAMBAHKAN METHOD INI UNTUK MENANGANI SUBMIT / SAVE ARTIKEL
  async createArticle(req, res, next) {
    try {
      const payload = req.body;

      // Memanggil method pembuat artikel di layer Service
      // (Pastikan method ini sudah dibuat di articleService.js)
      const newArticle = await articleService.createArticle(payload);

      return res.status(201).json({
        status: "success",
        message: "Artikel berhasil dibuat!",
        data: newArticle,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ArticleController();
