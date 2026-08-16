require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const articleRoutes = require("./src/routes/articleRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const authRoutes = require("./src/routes/authRoutes");
const pollingRoutes = require("./src/routes/pollingRoutes");
const corsMiddleware = require("./src/middlewares/corsMidleware");

// Middleware
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// 1. Root Route (Penting agar Vercel tidak error saat cek halaman utama)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Indoframe Backend API is running successfully on Vercel!",
    status: "OK",
  });
});

// Endpoints
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/polling", pollingRoutes);

// Error Handler (Wajib ditaruh paling bawah!)
app.use(errorHandler);

// Hanya jalankan app.listen di environment Lokal
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Industrial Backend running on http://localhost:${PORT}`);
  });
}

// 2. WAJIB FOR VERCEL: Export app Express
module.exports = app;