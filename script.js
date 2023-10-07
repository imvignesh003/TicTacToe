let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        boardElement.children[index].textContent = currentPlayer;
        if (checkWin()) { 
            messageElement.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            messageElement.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    boardElement.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    messageElement.textContent = '';
    gameActive = true;
    currentPlayer = 'X';
}

// Event listeners
boardElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
        const index = Array.from(boardElement.children).indexOf(e.target);
        makeMove(index);
    }
});

resetButton.addEventListener('click', resetBoard);

// Initialize the board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    boardElement.appendChild(cell);
}
