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
}

module.exports = new ArticleController();
