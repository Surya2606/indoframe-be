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

// Endpoints
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
  app.use("/api/polling", pollingRoutes);
// Error Handler (Wajib ditaruh paling bawah!)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Industrial Backend running on http://localhost:${PORT}`);
});
