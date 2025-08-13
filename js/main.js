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
            // Only allow move if cell is empty and both players have selected images
            if (boardState[i] !== null) return;
            if (!playerSelections[0] || !playerSelections[1]) return;
            boardState[i] = currentPlayer;
            currentPlayer = 1 - currentPlayer;
            renderBoard();
        };
        board.appendChild(cell);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderImageSelection();
    renderBoard();
});