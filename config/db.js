// Sequelize configuration for connecting to MySQL database

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

if (process.env.NODE_ENV !== "test") {
  sequelize
    .authenticate()
    .then(() => console.log("Connected to MySQL database"))
    .catch((err) => console.error("Unable to connect to the database:", err));
}

module.exports = sequelize;
