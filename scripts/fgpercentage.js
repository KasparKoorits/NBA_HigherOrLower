// Frontend script for NBA career FG% game mode

let currentScore = 0;
let highScore = 0;

// Fetch high score from server
async function fetchHighScore() {
  const response = await fetch(
    "http://localhost:5000/players/highscore/fg_percentage",
    {
      headers: { "x-access-token": localStorage.getItem("token") },
    }
  );
  const highScoreData = await response.json();
  highScore = highScoreData.score || 0;
  document.getElementById("high-score").textContent = highScore;
}

// Update high score on server
async function updateHighScoreOnServer(newHighScore) {
  await fetch("http://localhost:5000/players/highscore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      game_type: "fg_percentage",
      score: newHighScore,
    }),
  });
}

// Fetch two random players and display them
async function fetchPlayers() {
  const response = await fetch("http://localhost:5000/players/random", {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  const players = await response.json();
  const [player1, player2] = players;

  document.getElementById("player1").innerHTML = `
      <h2>${player1.player_name}</h2>
      <img draggable="false" src="${player1.image_url}" alt="${player1.player_name}" class="player-image" onclick="checkWinner(${player1.fg_percentage}, ${player2.fg_percentage}, 1)">
    `;

  document.getElementById("player2").innerHTML = `
      <h2>${player2.player_name}</h2>
      <img draggable="false" src="${player2.image_url}" alt="${player2.player_name}" class="player-image" onclick="checkWinner(${player1.fg_percentage}, ${player2.fg_percentage}, 2)">
    `;

  document.getElementById("player1").classList.remove("correct", "wrong");
  document.getElementById("player2").classList.remove("correct", "wrong");
}

// Check if selected player is the winner and update score
async function checkWinner(fg1, fg2, selected) {
  const player1Div = document.getElementById("player1");
  const player2Div = document.getElementById("player2");
  if ((selected === 1 && fg1 > fg2) || (selected === 2 && fg2 > fg1)) {
    currentScore++;
    document.getElementById("current-score").textContent = currentScore;
    if (currentScore > highScore) {
      highScore = currentScore;
      document.getElementById("high-score").textContent = highScore;
      await updateHighScoreOnServer(highScore);
    }
    selected === 1
      ? player1Div.classList.add("correct")
      : player2Div.classList.add("correct");
  } else {
    currentScore = 0;
    document.getElementById("current-score").textContent = currentScore;
    selected === 1
      ? player1Div.classList.add("wrong")
      : player2Div.classList.add("wrong");
  }
  setTimeout(fetchPlayers, 800);
}

fetchPlayers();
fetchHighScore();
