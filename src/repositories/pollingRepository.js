const supabase = require("../config/supabase");

class PollingRepository {
  // Ambil polling aktif beserta pilihan jawabannya
  async findActivePoll() {
    const { data, error } = await supabase
      .from("polls")
      .select(
        `
        id,
        title,
        status,
        poll_options (
          id,
          option_text,
          votes_count
        )
      `,
      )
      .eq("status", "active")
      .single();

    if (error && error.code !== "PGRST116") throw error; // Abaikan jika data kosong
    return data;
  }

  // Cek apakah user/IP sudah pernah memilih
  async findVoteByUserOrIp(pollId, userId, ipAddress) {
    let query = supabase.from("poll_votes").select("*").eq("poll_id", pollId);

    if (userId) {
      query = query.eq("user_id", userId);
    } else {
      query = query.eq("ip_address", ipAddress);
    }

    const { data, error } = await query.single();
    if (error && error.code !== "PGRST116") throw error;
    return data;
  }

  // Simpan vote baru
  async recordVote(pollId, optionId, userId, ipAddress) {
    // 1. Catat ke tabel poll_votes
    const { error: voteError } = await supabase.from("poll_votes").insert([{ poll_id: pollId, option_id: optionId, user_id: userId, ip_address: ipAddress }]);
    if (voteError) throw voteError;

    // 2. Increment / tambah jumlah votes di option terkait
    const { error: updateError } = await supabase.rpc("increment_vote", {
      option_id_param: optionId,
    });

    // Jika belum buat RPC function di Supabase, bisa fallback kueri manual atau update count biasa
    if (updateError) {
      // Fallback manual count update
      const { data: opt } = await supabase.from("poll_options").select("votes_count").eq("id", optionId).single();
      await supabase
        .from("poll_options")
        .update({ votes_count: (opt?.votes_count || 0) + 1 })
        .eq("id", optionId);
    }

    return true;
  }
}

module.exports = new PollingRepository();
