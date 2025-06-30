const quoteElement = document.getElementById("quote");
const inputArea = document.getElementById("input-area");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn"); 

const quotes = [
  "Practice makes perfect.",
  "JavaScript is fun to learn.",
  "You can build anything with code.",
  "Typing fast requires focus and skill.",
  "Debugging is twice as hard as writing the code."
];

let currentQuote = "";
let timeLeft = 20;
let timer = null;
let testStarted = false;

startBtn.addEventListener("click", startTest);

submitBtn.addEventListener("click", submitTest);

function startTest() {
    currentQuote = getRandomQuote();
    quoteElement.textContent = currentQuote;
    inputArea.value = "";
    inputArea.disabled = false;
    inputArea.focus();
    timeLeft = 20;
    timerElement.textContent = timeLeft;
    wpmElement.textContent = 0;
    accuracyElement.textContent = 0;
    if (timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    testStarted = true;
    inputArea.addEventListener("input", checkInput);
    submitBtn.style.display = "block";
    startBtn.style.display = "none";
}
  
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    inputArea.disabled = true;
    calculateResults();
    submitBtn.style.display = "none"; 
    startBtn.style.display = "block";
  }
}

function checkInput() {
  const typedText = inputArea.value;
  const correctPortion = currentQuote.substring(0, typedText.length);

  if (typedText === correctPortion) {
    inputArea.style.borderColor = "green";
  } else {
    inputArea.style.borderColor = "red";
  }
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function calculateResults() {
  const typedText = inputArea.value;
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const correctChars = typedText
    .split("")
    .filter((char, index) => char === currentQuote[index]).length;

  const totalChars = currentQuote.length;
  const wpm = Math.round(wordsTyped); 
  const accuracy = Math.round((correctChars / totalChars) * 100);

  wpmElement.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyElement.textContent = isNaN(accuracy) ? 0 : accuracy;
}

function submitTest() {
    if (!testStarted) return;
    clearInterval(timer);
    inputArea.disabled = true;
    calculateResults();
    submitBtn.style.display = "none";
    startBtn.style.display = "block";
}