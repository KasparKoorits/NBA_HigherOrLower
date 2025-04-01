const express = require("express");
const {
  getAllPlayers,
  getRandomPlayers,
  getHighScore,
  updateHighScore,
} = require("../controllers/playerController");

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/random", getRandomPlayers);
router.get("/highscore/:game_type", getHighScore);
router.post("/highscore", updateHighScore);

module.exports = router;
