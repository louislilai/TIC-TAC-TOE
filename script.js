// Variables to track the game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Get elements
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const status = document.getElementById('status');

// Function to handle a cell click
function handleCellClick(cell, cellIndex) {
  if (board[cellIndex] === '' && gameActive) {
    cell.textContent = currentPlayer;
    board[cellIndex] = currentPlayer;

    if (checkWin()) {
      status.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every((cell) => cell !== '')) {
      status.textContent = 'It\'s a draw!';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Function to check for a win
function checkWin() {
  for (const [a, b, c] of winCombination) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  status.textContent = `Player X's turn`;
  cells.forEach((cell) => (cell.textContent = ''));
}

// Add click event listeners to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

// Add click event listener to the reset button
resetButton.addEventListener('click', resetGame);

// Initial game status
status.textContent = `Player ${currentPlayer}'s turn`;
