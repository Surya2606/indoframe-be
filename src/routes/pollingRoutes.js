const express = require("express");
const router = express.Router();
const pollingController = require("../controllers/pollingController");

// Endpoint GET: Ambil data polling aktif
router.get("/active", (req, res, next) => pollingController.getActivePoll(req, res, next));

// Endpoint POST: Mengirim suara / vote
router.post("/vote", (req, res, next) => pollingController.vote(req, res, next));

module.exports = router;
