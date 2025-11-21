# 🎮 React Game Hub



A comprehensive collection of classic arcade and puzzle games built with **React**, **Vite**, and **Tailwind CSS**. This project serves as a centralized platform where users can play varying genres of games, ranging from logic puzzles to fast-paced arcade classics.

## ✨ Features

* **⚡ Modern Tech Stack:** Built with React 18 and Vite for blazing fast performance.
* **🎨 Responsive Design:** Fully responsive layouts ensuring gameplay on desktop and mobile devices.
* **🤖 Single & Multiplayer Modes:** several games feature local PvP (Player vs Player) and PvCPU (Player vs Computer) modes.
* **🧩 Component-Based Architecture:** Clean, modular folder structure for easy maintenance and scalability.

## 🕹️ The Games

This hub currently features **9** playable games:

| Game | Description | Modes |
| :--- | :--- | :--- |
| **Tic-Tac-Toe** | The classic X and O game. | 👤 Single (vs CPU) <br> 👥 Local Multiplayer |
| **Rock Paper Scissors** | The ultimate decision-making game with animations. | 👤 Single (vs CPU) <br> 👥 Local Multiplayer |
| **2048** | Slide tiles to combine them and reach the 2048 tile. | 👤 Single Player |
| **15 Puzzle** | Slide numbered tiles to order them from 1 to 15. | 👤 Single Player |
| **Flappy Bird** | Navigate the bird through pipes without crashing. | 👤 Single Player |
| **Memory** | Test your memory by finding matching pairs of cards. | 👤 Single Player |
| **Snake** | Eat food to grow longer, but don't hit the walls! | 👤 Single Player |
| **Sudoku** | Logic-based number-placement puzzle with difficulty settings. | 👤 Single Player |
| **Tetris** | The legendary block-stacking puzzle game. | 👤 Single Player |

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Build Tool:** Vite
* **Styling:** Tailwind CSS & Pure CSS modules
* **Routing:** React Router DOM
* **Linting:** ESLint

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/games-hub.git](https://github.com/your-username/games-hub.git)
    cd games-hub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`).

## 📂 Project Structure

The project follows a modular structure where each game is self-contained within its own directory.

```text
src/
├── components/          # Shared UI components (Layouts, Cards)
├── games/               # Individual game logic and styles
│   ├── 2048/
│   ├── fifteen-puzzle/
│   ├── FlappyBird/
│   ├── memory/
│   ├── RockPaperScissors/
│   ├── snake/
│   ├── sudoku/
│   ├── tetris/
│   └── tic-tac-toe/
├── pages/               # Main application pages (Home)
├── App.jsx              # Main Router configuration
├── games.js             # Configuration object for all games
└── main.jsx             # Entry point
