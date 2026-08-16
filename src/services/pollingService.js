const pollingRepository = require("../repositories/pollingRepository");

class PollingService {
  async getActivePoll() {
    const poll = await pollingRepository.findActivePoll();
    if (!poll) {
      return { message: "Belum ada polling aktif saat ini." };
    }
    return poll;
  }

  async vote(pollId, optionId, userId, ipAddress) {
    if (!pollId || !optionId) {
      throw { statusCode: 400, message: "Poll ID dan Option ID wajib diisi!" };
    }

    // Cek apakah user/IP sudah pernah voting
    const existingVote = await pollingRepository.findVoteByUserOrIp(pollId, userId, ipAddress);
    if (existingVote) {
      throw { statusCode: 400, message: "Kamu sudah memberikan suara pada polling ini!" };
    }

    await pollingRepository.recordVote(pollId, optionId, userId, ipAddress);
    return { message: "Berhasil memberikan suara!" };
  }
}

module.exports = new PollingService();
