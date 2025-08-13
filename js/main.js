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

function renderBoard() {
    const board = document.getElementById('game-board');
    if (!board) return;
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.onclick = () => {
            // Game logic for placing marker will go here
            console.log('Cell clicked:', i);
        };
        board.appendChild(cell);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderImageSelection();
    renderBoard();
});