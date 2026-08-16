const articleRepository = require("../repositories/articleRepository");

class ArticleService {
  async getArticles(searchQuery) {
    const cleanQuery = searchQuery ? searchQuery.trim() : "";

    // Logika Bisnis 1: Jika search kosong -> Ambil semua untuk Beranda
    if (!cleanQuery) {
      return await articleRepository.findAll();
    }

    // Logika Bisnis 2: Jika ada search ("timnas") -> Panggil FTS Repository
    return await articleRepository.searchFullText(cleanQuery);
  }
}

module.exports = new ArticleService();
