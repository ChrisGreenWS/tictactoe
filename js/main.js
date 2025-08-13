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
                // If both players have now selected, clear the message if it was the warning
                if (playerSelections[0] && playerSelections[1]) {
                    const msgDiv = document.getElementById('game-message');
                    if (msgDiv && msgDiv.textContent === 'Please select an image before playing') {
                        msgDiv.textContent = '';
                    }
                    // Immediately show whose turn it is with their marker
                    if (!gameOver) {
                        showTurnMessage(currentPlayer);
                    }
                }
            };
            optionsDiv.appendChild(imgElem);
        });
        playerDiv.appendChild(optionsDiv);
        container.appendChild(playerDiv);
    });
    // Also check after rendering in case both were already selected
    if (playerSelections[0] && playerSelections[1]) {
        const msgDiv = document.getElementById('game-message');
        if (msgDiv && msgDiv.textContent === 'Please select an image before playing') {
            msgDiv.textContent = '';
        }
        // Ensure the turn indicator is visible before the first move
        if (!gameOver) {
            showTurnMessage(currentPlayer);
        }
    }
}




let boardState = Array(9).fill(null); // null, 0, or 1 (player index)
let currentPlayer = 0;
let gameOver = false;

// Track starting order across games
let nextStartingPlayer = 0;     // who should start the next game
let roundStartingPlayer = 0;    // who started the current game

// Score tracking
let scores = {
    player1: 0,
    player2: 0,
    draws: 0
};

function renderScores() {
    let scoreDiv = document.getElementById('scoreboard');
    if (!scoreDiv) {
        scoreDiv = document.createElement('div');
        scoreDiv.id = 'scoreboard';
        scoreDiv.style.textAlign = 'center';
        scoreDiv.style.margin = '24px 0 0 0';
        document.getElementById('display-area').appendChild(scoreDiv);
    }
    scoreDiv.innerHTML = `
        <strong>Score</strong><br>
        Player 1: ${scores.player1} &nbsp;|&nbsp; Player 2: ${scores.player2} &nbsp;|&nbsp; Draws: ${scores.draws}
    `;

    // Button container (always present, but only show buttons if game is over)
    let btnContainer = document.getElementById('game-btns');
    if (!btnContainer) {
        btnContainer = document.createElement('div');
        btnContainer.id = 'game-btns';
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'center';
        btnContainer.style.gap = '16px';
        btnContainer.style.margin = '16px 0';
        scoreDiv.insertAdjacentElement('afterend', btnContainer);
    }
    if (gameOver) {
        btnContainer.innerHTML = '';
        // Reset button
        let resetBtn = document.createElement('button');
        resetBtn.id = 'reset-btn';
        resetBtn.textContent = 'New Game';
        resetBtn.style.padding = '8px 24px';
        resetBtn.style.fontSize = '1rem';
        resetBtn.onclick = resetGame;
        btnContainer.appendChild(resetBtn);
        // New Tournament button
        let tournamentBtn = document.createElement('button');
        tournamentBtn.id = 'tournament-btn';
        tournamentBtn.textContent = 'New Tournament';
        tournamentBtn.style.padding = '8px 24px';
        tournamentBtn.style.fontSize = '1rem';
        tournamentBtn.onclick = newTournament;
        btnContainer.appendChild(tournamentBtn);
    } else {
        btnContainer.innerHTML = '';
    }
}

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
    renderScores();
    const board = document.getElementById('game-board');
    if (!board) return;
    board.innerHTML = '';
    // Show current turn if game is not over
    if (!gameOver && playerSelections[0] && playerSelections[1]) {
        showTurnMessage(currentPlayer);
    }
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        if (boardState[i] !== null) {
            // Place marker image
            const imgElem = document.createElement('img');
            imgElem.src = playerSelections[boardState[i]];
            imgElem.alt = `Player ${boardState[i] + 1} marker`;
            // Animate only the most recent move
            if (window.lastMoveIndex === i) {
                imgElem.classList.add('marker-animate');
            }
            cell.appendChild(imgElem);
            cell.classList.add('filled');
        }
        cell.onclick = () => {
            if (gameOver) return;
            // Only allow move if cell is empty
            if (boardState[i] !== null) return;
            if (!playerSelections[0] || !playerSelections[1]) {
                    showMessage("Please select an image before playing");
                    // Set color to red for this warning
                    const msgDiv = document.getElementById('game-message');
                    if (msgDiv) msgDiv.style.color = 'red';
                return;
            }
            boardState[i] = currentPlayer;
            window.lastMoveIndex = i;
            const winner = checkWinner();
            if (winner !== null) {
                gameOver = true;
                // Update score
                if (winner === 0) scores.player1++;
                else scores.player2++;
                // Loser starts the next game
                nextStartingPlayer = 1 - winner;
                renderBoard();
                showMessage(`Player ${winner + 1} wins!`, 'green', true);
                return;
            }
            if (isDraw()) {
                gameOver = true;
                scores.draws++;
                // Draw: same starter goes first again
                nextStartingPlayer = roundStartingPlayer;
                renderBoard();
                showMessage("It's a draw!", 'orange', true);
                return;
            }
            currentPlayer = 1 - currentPlayer;
            renderBoard();
        };
        board.appendChild(cell);
    }
}



function showMessage(msg, color, animate) {
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
    // Set color for special messages
    if (color) {
        msgDiv.style.color = color;
    } else if (msg === 'Please select an image before playing') {
        msgDiv.style.color = 'red';
    } else {
        msgDiv.style.color = '';
    }
    // Animate winner/draw message
    if (animate) {
        msgDiv.classList.remove('winner-animate');
        // Force reflow to restart animation if needed
        void msgDiv.offsetWidth;
        msgDiv.classList.add('winner-animate');
    } else {
        msgDiv.classList.remove('winner-animate');
    }
}

// Show a turn message with the current player's marker thumbnail
function showTurnMessage(playerIdx) {
    const marker = playerSelections[playerIdx];
    // Fallback to plain text if no marker yet
    if (!marker) {
        showMessage(`Player ${playerIdx + 1}'s turn`);
        return;
    }
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
    // Reset any winner animation/color
    msgDiv.classList.remove('winner-animate');
    msgDiv.style.color = '';
    // Compose thumbnail + text
    msgDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = marker;
    img.alt = `Player ${playerIdx + 1} marker`;
    img.className = 'turn-thumb';
    const span = document.createElement('span');
    span.textContent = `Player ${playerIdx + 1}'s turn`;
    msgDiv.appendChild(img);
    msgDiv.appendChild(span);
}

function newTournament() {
    boardState = Array(9).fill(null);
    currentPlayer = 0;
    gameOver = false;
    scores = { player1: 0, player2: 0, draws: 0 };
    playerSelections[0] = null;
    playerSelections[1] = null;
    // Reset starting order for a new tournament
    nextStartingPlayer = 0;
    roundStartingPlayer = nextStartingPlayer;
    // Remove message
    let msgDiv = document.getElementById('game-message');
    if (msgDiv) msgDiv.remove();
    // Always recreate the message area to preserve space
    msgDiv = document.createElement('div');
    msgDiv.id = 'game-message';
    msgDiv.style.textAlign = 'center';
    msgDiv.style.fontWeight = 'bold';
    msgDiv.style.margin = '16px 0';
    msgDiv.style.fontSize = '1.2rem';
    document.getElementById('display-area').insertBefore(msgDiv, document.getElementById('game-board'));
    renderImageSelection();
    renderBoard();
}



function resetGame() {
    boardState = Array(9).fill(null);
    // Use the computed next starting player from the previous game
    currentPlayer = nextStartingPlayer;
    roundStartingPlayer = currentPlayer;
    gameOver = false;
    // Remove message
    let msgDiv = document.getElementById('game-message');
    if (msgDiv) msgDiv.remove();
    // Always recreate the message area to preserve space
    msgDiv = document.createElement('div');
    msgDiv.id = 'game-message';
    msgDiv.style.textAlign = 'center';
    msgDiv.style.fontWeight = 'bold';
    msgDiv.style.margin = '16px 0';
    msgDiv.style.fontSize = '1.2rem';
    document.getElementById('display-area').insertBefore(msgDiv, document.getElementById('game-board'));
    renderBoard();
}

document.addEventListener('DOMContentLoaded', () => {
    renderImageSelection();
    // Always create the message area to reserve space
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
    // Initialize starting order on first load
    currentPlayer = nextStartingPlayer;   // defaults to 0
    roundStartingPlayer = currentPlayer;
    renderBoard();
});