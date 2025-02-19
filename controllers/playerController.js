const db = require("../config/db");

const getAllPlayers = (req, res) => {
  db.query("SELECT * FROM players", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getRandomPlayers = (req, res) => {
  db.query(
    "SELECT player_name, image_url, ppg, rating, fg_percentage FROM players ORDER BY RAND() LIMIT 2",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

module.exports = { getAllPlayers, getRandomPlayers };
