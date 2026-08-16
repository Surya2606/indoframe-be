const supabase = require("../config/supabase");

class ArticleRepository {
  // Ambil semua artikel untuk Beranda
  async findAll() {
    const { data, error } = await supabase.from("articles").select("*, categories(name)");

    if (error) throw error;

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

  // TAMBAHKAN METHOD INI UNTUK INSERT KE SUPABASE
  async create(payload) {
    // Menyesuaikan payload frontend ke nama kolom di Supabase
    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          title: payload.title,
          content: payload.content || payload.contentHtml,
          description: payload.description,
          summary_social: payload.summarySocial,
          channel_id: payload.channelId,
          topic_id: payload.topicId,
          keyword: payload.keyword,
          created_at: payload.createdAt,
          location: payload.location,
          is_18_plus: payload.is18Plus,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  }
}

module.exports = new ArticleRepository();
