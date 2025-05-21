// Main server file: sets up Express app, routes, and database sync

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("../config/db");
const authRoutes = require("../routes/auth");
const playerRoutes = require("../routes/players");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

const app = express();
app.use(express.json());
app.use(cors());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes for authentication and player data
app.use("/auth", authRoutes);
app.use("/players", playerRoutes); // Removed verifyToken middleware

// Sync database and start server
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
