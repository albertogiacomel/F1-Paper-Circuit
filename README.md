# 🏎️ F1 Paper Circuit

**F1 Paper Circuit** is a turn-based racing board game built with **React**, **TypeScript**, and **Tailwind CSS**. It simulates a race on graph paper where players roll dice to move, aiming to hit Pit Stops for bonuses while avoiding Danger Zones.

![Game Preview](https://via.placeholder.com/800x400?text=F1+Paper+Circuit+Preview)

## 🌟 Features

*   **Game Modes**:
    *   🧑‍🤝‍🧑 **1 vs 1 (PVP)**: Local multiplayer against a friend.
    *   🤖 **1 vs AI**: Challenge a bot with automatic moves.
*   **Dynamic Gameplay**:
    *   🎲 **Dice Rolling**: Move based on RNG.
    *   🔧 **Pit Stops**: Landing on yellow cells grants an extra turn.
    *   ⚠️ **Danger Zones**: Landing on red cells moves you back 1 space.
    *   🏁 **Win Condition**: First to reach the finish line wins.
*   **Customization & Accessibility**:
    *   🌍 **Multi-language**: Support for English (EN) and Italian (IT).
    *   🌗 **Dark Mode**: High contrast dark theme for better visibility.
    *   📺 **Full Screen**: Immersive mode.
*   **Tech**:
    *   Built with React 19 & Lucide Icons.
    *   Responsive design using Tailwind CSS.
    *   Graph paper aesthetic with SVG rendering.

## 🚀 Installation & Setup

This project uses standard web technologies.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/f1-paper-circuit.git
    cd f1-paper-circuit
    ```

2.  **Install dependencies** (if using a local bundler like Vite/CRA):
    ```bash
    npm install
    ```

3.  **Run the project**:
    ```bash
    npm run dev
    ```

*Note: The current version is set up to run in a standalone ESM environment (like StackBlitz or direct browser import via index.html), but can easily be ported to Next.js or Vite.*

## 🎮 How to Play

1.  Select **1 vs 1** or **1 vs AI** from the main menu.
2.  **Player 1** starts by clicking the "Roll Dice" button.
3.  The token moves automatically on the graph paper track.
4.  Watch out for special tiles:
    *   **Yellow Wrench**: Bonus turn! Roll again immediately.
    *   **Red Warning**: Penalty! Move back 1 step.
5.  Turns alternate until someone crosses the finish line (Cell 40).

## 🗺️ Maps

The game supports multiple track configurations located in `config/maps/`.

*   **Monza Paper** (Default): A technical track with chicanes and multiple danger zones.
*   **Oval Speed**: A simple high-speed ring (can be enabled in `config/maps/index.ts`).

### Adding a new Map

1.  Create a file in `config/maps/my_track.ts`.
2.  Define the path coordinates (`x, y`), pit stops, and danger zones conforming to the `TrackDefinition` interface.
3.  Export it in `config/maps/index.ts`.

## 🛠️ Project Structure

```
├── config/           # Game configuration
│   ├── constants.ts  # Global rules & active settings
│   └── maps/         # Track definitions (Monza, Oval, etc.)
├── components/       # UI Components (Map, Cards, Logs)
├── i18n/             # Translations (IT/EN)
├── types/            # TypeScript interfaces
├── gameEngine.ts     # Core logic (Move calculations)
├── useGame.ts        # Game state management hook
├── App.tsx           # Main application entry
└── index.html        # Entry point
```

## 📄 License

MIT License. Free to use and modify.
