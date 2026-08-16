const supabase = require("../config/supabase");

class CategoryRepository {
  async findAll() {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return data;
  }

  async create(categoryData) {
    const { data, error } = await supabase.from("categories").insert([categoryData]).select();
    if (error) throw error;
    return data[0];
  }
}

module.exports = new CategoryRepository();