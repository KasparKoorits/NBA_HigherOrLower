// User model: stores user credentials for authentication

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define User table with username and password_hash fields
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
