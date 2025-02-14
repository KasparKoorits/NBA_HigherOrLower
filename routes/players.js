const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

// Get all players
router.get("/", playerController.getAllPlayers);

// Get two random players
router.get("/random", playerController.getRandomPlayers);

module.exports = router;
