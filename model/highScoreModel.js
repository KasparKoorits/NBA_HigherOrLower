// Import required modules
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

// Define the HighScore model with game_type and score fields
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

// Set up associations: User has many HighScores, HighScore belongs to User
User.hasMany(HighScore, { foreignKey: "user_id" });
HighScore.belongsTo(User, { foreignKey: "user_id" });

// Export the HighScore model
module.exports = HighScore;
