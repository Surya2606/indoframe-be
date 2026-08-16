const supabase = require("../config/supabase");

class UserRepository {
  async findByEmail(email) {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
    if (error && error.code !== "PGRST116") throw error; // Ignore not found error
    return data;
  }

  async create(userData) {
    const { data, error } = await supabase.from("users").insert([userData]).select();
    if (error) throw error;
    return data[0];
  }
}

module.exports = new UserRepository();