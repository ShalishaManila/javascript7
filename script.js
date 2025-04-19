// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

const gameContainer = document.getElementsByClassName("container");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

// General Functions
// Start Game
function startGame() {
  intervalId = setInterval(updateTime, 1000);
  addWordToDOM();
}

// Add radom word to guess
function addWordToDOM() {
  console.log("Generating New word...");
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.textContent = randomWord;
  console.log(randomWord);
}

// Update score if guessed correct word
function updateScore() {
  score++;
  console.log("updating score", score);
  scoreEl.textContent = score;
}

// Game over if time out
function gameOver() {
  endgameEl.style.display = "flex";
  endgameEl.innerHTML = "";
  endgameEl.insertAdjacentHTML("beforeend", "<h1>Game Over</h1>");
  endgameEl.insertAdjacentHTML(
    "beforeend",
    `<p>Difficulty Level: ${difficultySelect.value} </h1>`
  );
  endgameEl.insertAdjacentHTML("beforeend", `<p>Final Score: ${score} </h1>`);
  //endgameEl.textContent = 'GAME OVER ... \n Time Out!!! \n Final Score: ', score, '\n Game Difficulty: ', difficultySelect.value;

  endgameEl.insertAdjacentHTML(
    "beforeend",
    "<button onClick=resetGame()>Restart Game</button>"
  );
}

// Reset Game
function resetGame() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  endgameEl.style.display = "none";
  console.log("clearing interval!!!");
  clearInterval(intervalId);
  switch (difficultySelect.value) {
    case "easy":
      time = 10;
      break;
    case "medium":
      time = 7;
      break;
    case "hard":
      time = 5;
      break;
    default:
      time = 10;
      break;
  }
  score = 0;
  console.log("score cleared", score);
  scoreEl.textContent = score;
  startGame();
}

// Listener Functions
// When settings button is clicked
function settingsBtn_Click() {
  if (settings.style.visibility === "hidden") {
    settings.style.visibility = "visible";
  } else {
    settings.style.visibility = "hidden";
  }
}

// Update time
function updateTime() {
  time--;
  timeEl.textContent = time + "s";
  if (time <= 0) {
    clearInterval(intervalId);
    gameOver();
  }
}

// When difficulty selection changes
function difficultySelect_Change() {
  console.log(difficultySelect.value);
  selectedDifficulty = difficultySelect.value;
}

// Check if correct word is guessed
function checkWord(e) {
  if (e.key === "Enter") {
    console.log(text.value);
    if (text.value === word.textContent) {
      console.log("Correct word gussed");
      updateScore();
      addWordToDOM();
      text.value = "";
      time = time + 5;
      timeEl.textContent = time + "s";
    }
  }
}

settingsBtn.addEventListener("click", settingsBtn_Click);

difficultySelect.addEventListener("change", difficultySelect_Change);

text.addEventListener("keypress", checkWord);

//Initializing word
let randomWord = words[Math.floor(Math.random() * words.length)];

//Initializing score
let score = 0;

//Initializing time
let time = 10;
let intervalId;

startGame();
