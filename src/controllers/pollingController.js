const pollingService = require("../services/pollingService");

class PollingController {
  async getActivePoll(req, res, next) {
    try {
      const poll = await pollingService.getActivePoll();
      res.status(200).json({ status: "success", data: poll });
    } catch (error) {
      next(error);
    }
  }

  async vote(req, res, next) {
    try {
      const { pollId, optionId } = req.body;
      const userId = req.user ? req.user.id : null; // Jika ada middleware auth
      const ipAddress = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";

      const result = await pollingService.vote(pollId, optionId, userId, ipAddress);
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PollingController();
