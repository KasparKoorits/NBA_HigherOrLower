const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const HighScore = sequelize.define("HighScore", {
  game_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

// Define the relationship between User and HighScore
User.hasMany(HighScore, { foreignKey: "user_id" });
HighScore.belongsTo(User, { foreignKey: "user_id" });

module.exports = HighScore;
