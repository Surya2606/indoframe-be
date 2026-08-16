const supabase = require("../config/supabase");

// Helper sederhana untuk generate Slug otomatis
const createSlug = (title) => {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Hapus karakter khusus
      .replace(/[\s_-]+/g, "-") // Ganti spasi dengan strip
      .replace(/^-+|-+$/g, "") +
    "-" +
    Date.now()
  ); // Tambah timestamp agar slug selalu UNIQUE
};

class ArticleRepository {
  // ... method findAll dan searchFullText tetapkan seperti sebelumnya ...

  async create(payload) {
    // Generate slug otomatis dari title
    const generatedSlug = createSlug(payload.title);

    // Mencegah error NaN jika payload channel/category kosong
    const categoryId = payload.channelId ? parseInt(payload.channelId, 10) : null;

    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          title: payload.title,
          slug: generatedSlug, // WAJIB ADA (NON-NULLABLE & UNIQUE)
          content: payload.content || payload.contentHtml,
          description: payload.description || null,
          excerpt: payload.description || null, // Diisi sama seperti description
          summary_social: payload.summarySocial || null,
          category_id: categoryId, // Merekam Channel/Kategori dari frontend
          created_at: payload.createdAt || new Date().toISOString(),
          status: "published", // Default status
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  }
}

module.exports = new ArticleRepository();
