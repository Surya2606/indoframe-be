require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes (Wajib pakai ./src/ karena index.js ada di luar folder src)
const articleRoutes = require("./src/routes/articleRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const authRoutes = require("./src/routes/authRoutes");
const pollingRoutes = require("./src/routes/pollingRoutes");

// Middleware
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Root Route
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

// Error Handler
app.use(errorHandler);

// Jalankan server di lokal
const PORT = process.env.PORT || 5000;
// Jalankan server hanya saat di lokal (bukan di Vercel)
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Industrial Backend running on http://localhost:${PORT}`);
  });
}

// Export app untuk Vercel
module.exports = app;
