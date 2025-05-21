// Handles player data and high score logic

const Player = require("../model/playerModel");
const HighScore = require("../model/highScoreModel");
const { Sequelize } = require("sequelize");

// Get all players from database
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get two random players
const getRandomPlayers = async (req, res) => {
  try {
    const players = await Player.findAll({
      order: Sequelize.literal("RAND()"),
      limit: 2,
    });
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get high score for a user and game type
const getHighScore = async (req, res) => {
  const { game_type } = req.params;
  const userId = req.userId; // Extracted from the JWT token

  try {
    const highScore = await HighScore.findOne({
      where: { user_id: userId, game_type },
    });

    res.json(highScore || { game_type, score: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update high score for a user and game type
const updateHighScore = async (req, res) => {
  const { game_type, score } = req.body;
  const userId = req.userId; // Extracted from the JWT token

  try {
    const [highScore, created] = await HighScore.findOrCreate({
      where: { user_id: userId, game_type },
      defaults: { score },
    });

    if (!created && score > highScore.score) {
      highScore.score = score;
      await highScore.save();
    }

    res.json(highScore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPlayers,
  getRandomPlayers,
  getHighScore,
  updateHighScore,
};
