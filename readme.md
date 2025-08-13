# Tic Tac Toe Web Game

A simple, responsive browser-based Tic Tac Toe game for two human players on the same device. Each player selects a unique image as their marker before the game starts.

## Features

- 3x3 Tic Tac Toe grid
- Two-player mode (same device)
- Players select images as markers (no X or O)
- Prevents both players from choosing the same image
- Displays current player's turn
- Detects win and draw conditions
- Reset/restart button
- Responsive, modern design using standard CSS
- All assets loaded locally (no external dependencies)

## Getting Started

1. **Clone or download this repository.**
2. **Add your marker images** to the `img/` folder.
3. **Open [`index.html`](index.html)** in your browser—no build step required.

## Project Structure

- [`index.html`](index.html): Main entry point
- [`js/main.js`](js/main.js): Game logic and UI updates
- [`css/styles.css`](.github/css/styles.css): Styles and layout
- [`img/`](img/): Marker images

## Development Notes

- All code is modular and well-commented for clarity.
- Use browser dev tools for debugging.
- To add images, place them in the `img/` folder and update the image selection UI.
- See [`PRD.md`](PRD.md) for detailed requirements and checklist.

## Stretch Goals

- Custom player names
- Score tracking
- Image upload
- Animations

---

For more details, see the [Product Requirements Document](PRD.md).