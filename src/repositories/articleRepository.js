const supabase = require("../config/supabase");

class ArticleRepository {
  // Ambil semua artikel untuk Beranda
  async findAll() {
    // 🟢 Meminta Supabase mengambil data artikel KALIAN beserta nama kategorinya
    const { data, error } = await supabase.from("articles").select("*, categories(name)");

    if (error) throw error;

    // Formatting sederhana agar 'category_name' langsung tersedia
    const formattedData = data.map((item) => ({
      ...item,
      category_name: item.categories?.name || "Berita Utama",
    }));

    return formattedData;
  }

  // Cari artikel menggunakan Full-Text Search (FTS) Postgres Supabase
  async searchFullText(query) {
    const { data, error } = await supabase.from("articles").select("*").or(`title.fts.${query},content.fts.${query}`).order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
}

module.exports = new ArticleRepository();
