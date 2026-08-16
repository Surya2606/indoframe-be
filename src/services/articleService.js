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

  // TAMBAHKAN METHOD INI UNTUK MENANGANI PEMBUATAN ARTIKEL
  async createArticle(payload) {
    // Tambahkan validasi bisnis di sini jika diperlukan
    if (!payload.title || !payload.content) {
      throw new Error("Judul dan konten wajib ada!");
    }

    // Memanggil layer Repository untuk menyimpan ke Database
    return await articleRepository.create(payload);
  }
}

module.exports = new ArticleService();
