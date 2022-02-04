// Import Game Clase
import Game from "./game.mjs";

// Game Creation
let game = new Game(document.querySelector(".board"));

// Game Deletion / Reset
document.getElementById('new-game').addEventListener("click",(event) => {
  location.reload();
})
