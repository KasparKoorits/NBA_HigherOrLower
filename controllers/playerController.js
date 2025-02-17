const db = require("../config/db");

exports.getAllPlayers = (req, res) => {
  db.query("SELECT * FROM players", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getRandomPlayers = (req, res) => {
  db.query(
    "SELECT player_name, image_url, ppg, rating FROM players ORDER BY RAND() LIMIT 2",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
