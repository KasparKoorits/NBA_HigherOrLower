# NBA Higher or Lower
NBA Higher or Lower is a web-based game where users guess which NBA player has higher stats in categories like career points per game (PPG), field goal percentage (FG%), three-point percentage (3PT%), or 2K ratings.

## Features
- **User Authentication**
- **Game Modes**:
  - Compare players' career PPG
  - Compare players' career FG%.
  - Compare players' career 3PT%.
  - Compare players' 2K ratings.
- **Score Tracking**:
- **Responsive Design**:

## Project Structure
- config/ db.js 
- controllers/ authController.js playerController.js 
- htmls/ 2k.html 3ptpercentage.html, fgpercentage.html, index.html, login.html, register.html, start.html 
- model/ userModel.js, highScoreModel.js, playerModel.js
- routes/ auth.js players.js 
- server/ server.js 
- style/ styles.css

## Endpoints
- POST /auth/register => Registering account
- POST /auth/login => Logging in account
- POST /players/highscore => Highscore for logged in user
- GET /players/ => Getting all players
- GET /players/random => Getting 2 random players
- GET /players/highscore/:game_type => Getting highscore for certain games to logged in user
