  // -    -   -   -   -  //
 // JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

// Initialise global variables
var counter = 0
var highScore = 0
var existingColumn = 0
var existingRow = 0
var gameInProgress = false

// Table coordinate randomiser
function randomiser () {
  column = Math.floor(Math.random() * (4 - 0 + 1)) + 0
  row = Math.floor(Math.random() * (4 - 0 + 1)) + 0
}

// Ensure mole can't reappear in the same spot
function forceDifferent() {
  existingColumn = column
  existingRow = row
  while (existingColumn === column && existingRow === row) {
    randomiser()
  }
}


// Create an image
function createImage () {
  gameInProgress = true
  var image = document.createElement("IMG")
  image.setAttribute("src", "mole.png")
  image.setAttribute("onClick", "moveMole()")
  let x = document.getElementById("table").rows[row].cells;
  x[column].appendChild(image)
}

// Delte an existing mole
function deleteMole () {
  if (gameInProgress === true) {
    let x = document.getElementById("table").rows[row].cells;
    x[column].innerHTML = "  ";
  }
}

// Sound effect
function boingAudio () {
  document.getElementById("boing").play()
}

// Update score counter each hit
function updateCounter () {
  counter ++
  let x = document.getElementById("counter")
  x.innerHTML = counter
}

// Reset counter on new game
function resetCounter () {
  counter = 0
  let x = document.getElementById("counter")
  x.innerHTML = counter
}

// Update high score if it's beaten
function updateHighScore () {
  let x = document.getElementById("highScore")
  x.innerHTML = highScore
}

// move the mole
function moveMole() {
  boingAudio()
  updateCounter()
  deleteMole()
  forceDifferent()
  createImage()
}

// Score alert
function gameOver () {
  deleteMole()
  if (counter > highScore) {
    highScore = counter
    updateHighScore()
    alert("Congratulations! " + counter + " is the fresh High Score!")
  } else if (counter < highScore) {
    alert("Try again!")
  } else {
    alert("Close!! But no cigar.")
  }
  resetCounter()
}

// Game initialisation
function gameInit() {
  deleteMole()
  randomiser();
  createImage();
  setTimeout(gameOver, 10000)
}
