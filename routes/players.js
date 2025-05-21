// Player routes: endpoints for player data and high scores

const express = require("express");
const {
  getAllPlayers,
  getRandomPlayers,
  getHighScore,
  updateHighScore,
} = require("../controllers/playerController");

const router = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: List of all players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   player_name:
 *                     type: string
 *                   image_url:
 *                     type: string
 *                   ppg:
 *                     type: number
 *                   rating:
 *                     type: number
 *                   fg_percentage:
 *                     type: number
 *                   3ptpercent:
 *                     type: number
 */
router.get("/", getAllPlayers);

/**
 * @swagger
 * /players/random:
 *   get:
 *     summary: Get two random players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Two random players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   player_name:
 *                     type: string
 *                   image_url:
 *                     type: string
 *                   ppg:
 *                     type: number
 *                   rating:
 *                     type: number
 *                   fg_percentage:
 *                     type: number
 *                   3ptpercent:
 *                     type: number
 */
router.get("/random", getRandomPlayers);

/**
 * @swagger
 * /players/highscore/{game_type}:
 *   get:
 *     summary: Get high score for a specific game type
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: game_type
 *         required: true
 *         schema:
 *           type: string
 *         description: The game type (e.g., ppg, fg_percentage, 3ptpercent, rating)
 *     responses:
 *       200:
 *         description: High score for the specified game type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game_type:
 *                   type: string
 *                 score:
 *                   type: number
 */
router.get("/highscore/:game_type", getHighScore);

/**
 * @swagger
 * /players/highscore:
 *   post:
 *     summary: Update high score for a specific game type
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_type:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: High score updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game_type:
 *                   type: string
 *                 score:
 *                   type: number
 */
router.post("/highscore", updateHighScore);

module.exports = router;
