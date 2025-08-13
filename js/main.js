// Main JS for Tic Tac Toe
const playerSelections = [null, null];
const imageOptions = [
    'img/Alfie.png',
    'img/Emery.png',
    'img/Hadley.png'
];

function renderImageSelection() {
    const container = document.getElementById('image-selection');
    if (!container) return;
    container.innerHTML = '';
    [0, 1].forEach(playerIdx => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-select';
        playerDiv.innerHTML = `<div>Player ${playerIdx + 1} select your marker:</div>`;
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'image-options';
        imageOptions.forEach((img, idx) => {
            const imgElem = document.createElement('img');
            imgElem.src = img;
            imgElem.className = 'image-option';
            if (playerSelections[playerIdx] === img) imgElem.classList.add('selected');
            // Disable if selected by the other player
            if (playerSelections[1 - playerIdx] === img) imgElem.classList.add('disabled');
            imgElem.onclick = () => {
                playerSelections[playerIdx] = img;
                // Prevent both players from selecting the same image
                if (playerSelections[0] === playerSelections[1]) {
                    playerSelections[1 - playerIdx] = null;
                }
                renderImageSelection();
            };
            optionsDiv.appendChild(imgElem);
        });
        playerDiv.appendChild(optionsDiv);
        container.appendChild(playerDiv);
    });
}



let boardState = Array(9).fill(null); // null, 0, or 1 (player index)
let currentPlayer = 0;
let gameOver = false;

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diags
    ];
    for (const [a,b,c] of winPatterns) {
        if (
            boardState[a] !== null &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            return boardState[a]; // 0 or 1
        }
    }
    return null;
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}


function renderBoard() {
    const board = document.getElementById('game-board');
    if (!board) return;
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        if (boardState[i] !== null) {
            // Place marker image
            const imgElem = document.createElement('img');
            imgElem.src = playerSelections[boardState[i]];
            imgElem.alt = `Player ${boardState[i] + 1} marker`;
            cell.appendChild(imgElem);
            cell.classList.add('filled');
        }
        cell.onclick = () => {
            if (gameOver) return;
            // Only allow move if cell is empty and both players have selected images
            if (boardState[i] !== null) return;
            if (!playerSelections[0] || !playerSelections[1]) return;
            boardState[i] = currentPlayer;
            const winner = checkWinner();
            if (winner !== null) {
                gameOver = true;
                renderBoard();
                showMessage(`Player ${winner + 1} wins!`);
                return;
            }
            if (isDraw()) {
                gameOver = true;
                renderBoard();
                showMessage("It's a draw!");
                return;
            }
            currentPlayer = 1 - currentPlayer;
            renderBoard();
        };
        board.appendChild(cell);
    }
}

function showMessage(msg) {
    let msgDiv = document.getElementById('game-message');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'game-message';
        msgDiv.style.textAlign = 'center';
        msgDiv.style.fontWeight = 'bold';
        msgDiv.style.margin = '16px 0';
        msgDiv.style.fontSize = '1.2rem';
        document.getElementById('display-area').insertBefore(msgDiv, document.getElementById('game-board'));
    }
    msgDiv.textContent = msg;

    // Add Reset button if not present
    let resetBtn = document.getElementById('reset-btn');
    if (!resetBtn) {
        resetBtn = document.createElement('button');
        resetBtn.id = 'reset-btn';
        resetBtn.textContent = 'Reset Game';
        resetBtn.style.display = 'block';
        resetBtn.style.margin = '16px auto';
        resetBtn.style.padding = '8px 24px';
        resetBtn.style.fontSize = '1rem';
        resetBtn.onclick = resetGame;
        msgDiv.insertAdjacentElement('afterend', resetBtn);
    }
}

function resetGame() {
    boardState = Array(9).fill(null);
    currentPlayer = 0;
    gameOver = false;
    // Remove message and reset button
    const msgDiv = document.getElementById('game-message');
    if (msgDiv) msgDiv.remove();
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.remove();
    renderBoard();
}

document.addEventListener('DOMContentLoaded', () => {
    renderImageSelection();
    renderBoard();
});