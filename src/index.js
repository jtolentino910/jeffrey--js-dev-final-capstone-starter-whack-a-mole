const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";


// Generates a random integer within a range.

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Sets the time delay given a difficulty parameter.

function setDelay(difficulty) {
  if (difficulty === "easy") {
      return 1500;
  }
  else if (difficulty === "normal") {
      return 1000;
  }
  else {
    return randomInteger(600, 1200);
  }
}


// Chooses a random hole from a list of holes.
 
function chooseHole() {
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}


// Calls the showUp function if time > 0 and stops the game if time = 0.

function gameOver() {
  if (time > 0) {
    let timeoutID = showUp();
    return timeoutID;
  }
  else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}


// This function simply calls the `showAndHide` function with a specific
//  delay and hole. 

function showUp() {
  const hole = chooseHole(holes);
  let delay = randomInteger(600, 1200);
    showAndHide(hole, delay);
  }

 
//  The purpose of this function is to show and hide the mole given
//  a delay time and the hole where the mole is hidden. 

function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
    }, delay);
  return timeoutID;
}


// Adds or removes the 'show' class that is defined in styles.css to 
// a given hole. It returns the hole.

function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}


//  This function increments the points global variable and updates the scoreboard.

function updateScore() {
  points = points + 1;
  score.textContent = points;
  return points;
}


//  This function clears the score by setting `points = 0`. It also updates
//  the board using `score.textContent = points`. The function should return
//  the points.

function clearScore() {
   points = 0;
   score.textContent = points;
  return points;
}

//  Updates the control board with the timer if time > 0

function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}


// Starts the timer using setInterval. For each 1000ms (1 second)
// the updateTimer function get called. This function is already implemented

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

// This is the event handler that gets called when a player
// clicks on a mole. 

function whack(event) {
  console.log("whack!")
  updateScore();
}

function setEventListeners() {
  moles.forEach(
    mole => mole.addEventListener('click', whack)
  );
  return moles;
}
setEventListeners();

//  This function sets the duration of the game. The time limit, in seconds,
//  that a player has to click on the sprites.

 function setDuration(duration) {   
   time = duration;
   timerInteralID = startTimer();
  return time;
}

//  This function is called when the game is stopped. It clears the
//  timer using clearInterval. Returns "game stopped".

function stopGame() {
  stopAudio(song);  
  clearInterval(timer);
  return " game stopped";
}


//  This is the function that starts the game when the `startButton`
// is clicked.

function startGame() {
  clearScore();
  clearInterval(timer);
  setEventListeners();
  setDuration(15);
  showUp();
  return "game started";
}
startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
