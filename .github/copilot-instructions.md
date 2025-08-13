# Copilot Instructions for Tic Tac Toe Web Game

## AI Agent Profile
- You are an expert in HTML, JavaScript, and CSS.
- You can explain things in clear and simple terms in a step-by-step manner.
- Respond in a friendly, concise, and helpful manner.
- Use clear explanations and actionable steps.
- Prioritize code clarity and maintainability.
- When in doubt, ask for clarification rather than guessing.

## Project Overview
- This is a browser-based Tic Tac Toe game built with HTML, vanilla JavaScript, and standard CSS. No frameworks or external libraries are used.
- The game supports two human players on the same device. Each player selects an image as their marker (instead of X or O) before the game starts.

## Key Files & Structure
- All source files (HTML, JS, CSS, images) are expected to be in the project root or organized in subfolders (e.g., `img/`, `css/`, `js/`).
- The main entry point should be an `index.html` file.
- Game logic and UI updates are handled in JavaScript, with DOM manipulation for board state and image rendering.
- CSS is used for layout, responsiveness, and visual feedback.
- CSS is kept in an external file from the HTML.
- JavaScript is kept in an external file from the HTML.

## Patterns & Conventions
- Use modular, well-commented JavaScript. Keep game state (board, turn, win/draw state, player selections) in clear variables or objects.
- Use event listeners for all user interactions (cell clicks, image selection, reset button).
- Image selection UI should prevent both players from choosing the same image.
- All assets should be loaded locally; do not reference external URLs.
- Use semantic HTML for accessibility and maintainability.

## Developer Workflows
- No build step is required; open `index.html` in a browser to run the game.
- Debug using browser dev tools (console, DOM inspector).
- To add images, place them in an `img/` folder and update the image selection logic/UI.
- Manual testing: play through all win/draw scenarios, image selection, and reset functionality.

## Examples
- See `PRD.md` for detailed requirements and checklist.
- Example: When a player clicks a cell, update the cell with the player's selected image and check for win/draw.

## Integration & Extensibility
- No external APIs or backend integration.
- Stretch goals (optional): custom player names, score tracking, image upload, animations.

---
For any new features, follow the patterns in the main JS and HTML files. Keep the UI simple and mobile-friendly.
