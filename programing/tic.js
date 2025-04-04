const board = document.querySelectorAll('.played');
const winnerDisplay = document.querySelector('.winner');
let currentPlayer = 'X';
let cells = Array(9).fill(null);

board.forEach((played, index) => {
  played.addEventListener('click', () => handleMove(played, index));
});

function handleMove(played, index) {
  if (!cells[index] && !winnerDisplay.textContent) {
    cells[index] = currentPlayer;
    played.textContent = currentPlayer;
    played.classList.add('taken');

    if (checkWinner()) {
      winnerDisplay.textContent = `${currentPlayer} Wins! 🎉`;
    } else if (cells.every(played => played)) {
      winnerDisplay.textContent = "It's a Draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombinations.some(combination =>
    combination.every(index => cells[index] === currentPlayer)
  );
}