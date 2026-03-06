require("dotenv").config();

const express = require("express");
const usersRoutes = require("./routes/users");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });

  next();
});

app.use("/api/users", usersRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvee"
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Serveur demarre sur http://localhost:${PORT}`);
  });
};

startServer();
