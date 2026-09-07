const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const brandRoutes = require("./routes/brands");
const perfumeRoutes = require("./routes/perfumes");
const customerRoutes = require("./routes/customers");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Zarxal Mall API ishlayapti 🚀"
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/perfumes", perfumeRoutes);
app.use("/api/customers", customerRoutes);

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Zarxal Mall API"
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route topilmadi"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Server xatosi"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Zarxal Mall API ${PORT}-portda ishga tushdi.`);
});