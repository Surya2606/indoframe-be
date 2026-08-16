const supabase = require("../config/supabase");

// Helper untuk buat Slug otomatis
const createSlug = (title) => {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Date.now()
  );
};

class ArticleRepository {
  // 1. DIBERSIHKAN: Hapus 'categories(name)' agar tidak HTTP 500
  async findAll() {
    const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // 2. Search FTS
  async searchFullText(query) {
    const { data, error } = await supabase.from("articles").select("*").or(`title.fts.${query},content.fts.${query}`).order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // 3. Insert artikel sesuai skema Supabase
 async create(payload) {
    const generatedSlug = createSlug(payload.title);
    const categoryId = payload.channelId ? parseInt(payload.channelId, 10) : null;
    
    // Tangkap gambar dari berbagai kemungkinan properti payload
    const imageSrc = payload.thumbnail || payload.imageUrl || payload.image || payload.thubnail || null;

    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          category_id: categoryId,
          title: payload.title,
          slug: generatedSlug,
          content: payload.content || payload.contentHtml,
          excerpt: payload.description || payload.excerpt || null,
          thumbnail: imageSrc,
          status: "published",
          published_at: payload.published_atAt || new Date().toISOString(),
          created_at: payload.createdAt || new Date().toISOString(),
          description: payload.description || null,
          summary_social: payload.summarySocial || null,
          topic: payload.categoryId || payload.categoryId,
          keyword: payload.keyword || payload.keyword,
          // 👈 Simpan ke kolom 'thumbnail' di Supabase
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  }
}

module.exports = new ArticleRepository();
