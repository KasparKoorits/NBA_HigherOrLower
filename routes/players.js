const express = require("express");
const {
  getAllPlayers,
  getRandomPlayers,
} = require("../controllers/playerController");

const router = express.Router();
router.get("/", getAllPlayers);
router.get("/random", getRandomPlayers);

module.exports = router;
