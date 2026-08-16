const cors = require("cors");

// Daftar domain yang diizinkan mengakses backend ini
const allowedOrigins = [
  "https://domain-laxo-kamu.com", // Domain frontend di Laxo
  "http://localhost:3000", // Frontend lokal (Next.js)
  "http://localhost:3001",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Izinkan request tanpa origin (seperti Postman/mobile app) atau domain yang terdaftar
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Akses diblokir oleh kebijakan CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Jika butuh cookie / session
};

module.exports = cors(corsOptions);
