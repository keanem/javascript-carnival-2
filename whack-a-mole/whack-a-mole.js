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
    alert("Congratulations! Your score of " + counter + " is the new High Score!")
  } else if (counter < highScore) {
    alert("You scored " + counter + " which is less than the High Score. Take a hike, pal! (or play again)")
  } else {
    alert("You scored " + counter + " which is equal to the current High Score. But it's not better than it, so....")
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
