const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Player = sequelize.define(
  "Player",
  {
    player_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ppg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fg_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "3ptpercent": {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Players",
  }
);

module.exports = Player;
