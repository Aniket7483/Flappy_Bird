const bird = document.getElementById('bird');
const pipe = document.getElementById('pipe');

let birdTop = 250; // Initial position of the bird
let gravity = 2;   // Gravity effect
let pipeLeft = 400; // Pipe starting position
let score = 0;     // Game score
let passedPipe = false; // Tracks if the bird has passed the pipe

// Move the bird and apply gravity
function moveBird() {
  birdTop += gravity;

  // Allow the bird to move freely above 0 and fall back due to gravity
  bird.style.top = birdTop + 'px';

  // Check collision with the bottom of the game container
  if (birdTop > 570) {
    endGame();
  }
}

// Move the pipe and reset its position
function movePipe() {
  pipeLeft -= 2;

  // Check if the bird passed the pipe
  if (pipeLeft < 50 && !passedPipe) {
    passedPipe = true; // Mark pipe as passed
    score++; // Increment score
    updateScore(); // Update the score display
  }

  // Reset the pipe when it goes out of view
  if (pipeLeft < -50) {
    pipeLeft = 400;
    passedPipe = false; // Reset passedPipe for the new pipe
  }

  pipe.style.left = pipeLeft + 'px';

  // Check collision with the pipe
  if (
    pipeLeft < 80 &&
    pipeLeft > 50 &&
    (birdTop < 200 || birdTop > 400) // Adjust collision logic for the gap
  ) {
    endGame();
  }
}

// Make the bird jump
document.addEventListener('keydown', () => {
  birdTop -= 40; // Make the bird jump upwards
});

// End the game
function endGame() {
  alert(`Game Over! Your score: ${score}`);
  clearInterval(gameInterval);

  // Show the restart button
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.style.display = 'block';
}

// Update the score display
function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Score: ${score}`;
}

// Restart the game
function restartGame() {
  // Reset variables
  birdTop = 250;
  pipeLeft = 400;
  score = 0;
  passedPipe = false;

  // Reset positions and score display
  bird.style.top = birdTop + 'px';
  pipe.style.left = pipeLeft + 'px';
  updateScore();

  // Hide the restart button
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.style.display = 'none';

  // Restart the game loop
  gameInterval = setInterval(() => {
    moveBird();
    movePipe();
  }, 20);
}

// Start the game loop
let gameInterval = setInterval(() => {
  moveBird();
  movePipe();
}, 20);
