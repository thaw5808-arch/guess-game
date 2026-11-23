const MAX_ATTEMPTS = 5;

const guessInput = document.getElementById("guess-value");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const attemptEl = document.getElementById("attempt");
const resultEl = document.getElementById("result");

let target = 0;
let attempts = 0;

function isNumeric(value) {
  return value.trim() !== "" && !isNaN(value) && isFinite(value);
}

function showGuessButton() {
  guessBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
}

function showRestartButton() {
  guessBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

function focusInput() {
  guessInput.focus();
  guessInput.select();
}

// Initial state (also on refresh): only Restart, empty field, 0/5, no result
function init() {
  guessInput.value = "";
  attemptEl.textContent = "0";
  resultEl.textContent = "";
  showRestartButton();
}

function restart() {
  target = Math.floor(Math.random() * 20) + 1; // 1 - 20
  attempts = 0;
  attemptEl.textContent = attempts;
  resultEl.textContent = "";
  guessInput.value = "";
  showGuessButton();
  focusInput();
}

function guess() {
  const raw = guessInput.value;
  if (!isNumeric(raw)) return; // empty or non-number: do nothing

  const value = Number(raw);
  attempts++;
  attemptEl.textContent = attempts;

  if (value === target) {
    resultEl.textContent = "You WIN";
    showRestartButton();
  } else if (attempts >= MAX_ATTEMPTS) {
    resultEl.textContent = "You LOSE";
    showRestartButton();
  } else if (value > target) {
    resultEl.textContent = value + " is too high";
  } else {
    resultEl.textContent = value + " is too low";
  }

  guessInput.value = 0;
  focusInput();
}

guessBtn.addEventListener("click", guess);
restartBtn.addEventListener("click", restart);
guessInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") guess();
});

init();
