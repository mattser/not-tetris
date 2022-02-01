// Call things with x,y 
// Coordinates will be in a 3 letter string: 2 for y (0-21) and 1 for x (0-9)

import Tetromino from "./tetromino.mjs"

// New Game
class Game {
  constructor (element) {
    this._board = new Board(element);
    this._element = element;
    this._score = 0;
    this.addKeyPressListener();
    this._activeTetromino = {};
  }
  get board () {
    return this._board;
  }

  addKeyPressListener() {
    document.addEventListener('keypress',(event) => {
      if (event.code === "Space") {
        if (Object.keys(this._activeTetromino).length > 0) {
          this._activeTetromino.toggleDraw();
        }
        this._activeTetromino = new Tetromino();
        this._activeTetromino.toggleDraw();
        console.log("You Pressed Space")
      }
    })
  }
}

class Board {
  constructor (element) {
    this._element = element;
    this.drawNewBoard(element);
    this._grid = this.createGrid();
  }

  drawNewBoard (element) {
    for (let y = 0; y <= 21; y++) {
      for (let x = 0; x <=9; x++) {
        element.innerHTML+=`\n<div class="board__block" id="${String(x)+"x"+String(y)}">${String(x)+"x"+String(y)}</div>`;
      }
    }
  }
  createGrid () {
    return new Array(10).fill( new Array(22).fill(0));
  }

  get grid () {
    return this._grid;
  }
  set grid (value) {
    this._grid = value;
  }
}
// Create a new board
  // Board is 10 x 22 cells
  // Draw grid on the html



// Create New Tetromino
  // Pick random from a pool
  // Render at the top of the page

// Move Tetromino Down
  // On click, translate the position of the tetromino down by 1.
  // Tetrominos are rended from a single position and orientation parameter

const notTetris = new Game(document.querySelector(".board"));

// Rotate Left:
  // Y becomes negative x
  // X becomes y

// Rotate Right
  // x becomes negative y
  // y becomes x


// pipe
// [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]

// square
// [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]

// Skew
