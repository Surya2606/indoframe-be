require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes (Ubah ./src/routes menjadi ./routes)
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const pollingRoutes = require("./routes/pollingRoutes");
const corsMiddleware = require("./middlewares/corsMidleware");

// Middleware (Ubah ./src/middlewares menjadi ./middlewares)
const errorHandler = require("./middlewares/errorHandler");

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

// Hanya jalankan app.listen di environment Lokal
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Industrial Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
