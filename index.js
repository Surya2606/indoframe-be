require("dotenv").config();
const express = require("express");
const cors = require("cors");

// TAMBAHKAN ./src/ PADA SEMUA ROUTE & MIDDLEWARE
const articleRoutes = require("./src/routes/articleRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const authRoutes = require("./src/routes/authRoutes");
const pollingRoutes = require("./src/routes/pollingRoutes");

// Middleware
const corsMiddleware = require("./src/middlewares/corsMidleware");
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

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
