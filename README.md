# NBA Higher or Lower
NBA Higher or Lower is a web-based game where users guess which NBA player has higher stats in categories like field goal percentage (FG%), three-point percentage (3PT%), or 2K ratings.

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
- htmls/ 2k.html 3ptpercentage.html fgpercentage.html index.html login.html register.html start.html 
- model/ userModel.js
- routes/ auth.js players.js 
- server/ server.js 
- style/ styles.css

## Endpoints
- POST /auth/register => Registering account
- POST /auth/login => Logging in account
- GET /players/ => Getting a player
- GET /players/random => Getting 2 random players
