import Tetromino from "./tetromino.mjs";
import Board from "./board.mjs";

export default class Game {
  constructor (element) {
    this._board = new Board(element);
    this._element = element;
    this._score = 0;
    this.addKeyPressListener();
    this._activeTetromino = {};
    this._ableToRotate = false;
  }
  get board () {
    return this._board;
  }

  addKeyPressListener() {
    document.addEventListener('keypress',(event) => {
      switch(event.code) {
        case "Space":
          document.querySelector("p").classList.toggle("hidden")
          this._activeTetromino = new Tetromino();
          this._activeTetromino.toggleDraw();
          setTimeout(this.runGame,500);
          break;
        case "KeyA":
          if (this._activeTetromino.isAbleToMove("left",this._board.grid)) this._activeTetromino.translate("left");
          break;
        case "KeyD":
          if (this._activeTetromino.isAbleToMove("right",this._board.grid)) this._activeTetromino.translate("right");
          break;
        case "KeyS":
          if (this._ableToRotate) this._activeTetromino.rotate();
          break;
      }
    })
  }
  
  runGame = async () => {
    
    if (this._board.isGameOver()) {
      this.gameOver();

    } else {

      this._score += await this._board.checkForFilledRows();
      document.querySelector('#score').innerHTML = `Score: ${this._score}`;
      this._ableToRotate = false;
      if (this._activeTetromino.isAbleToMove("down",this._board.grid)) {
        this._activeTetromino.translate("down");
        this._ableToRotate = true;
        setTimeout(this.runGame, 100);
      } else {
        this._board.mergeToGrid(this._activeTetromino.blockPositions)
        this._activeTetromino = {};
        this._activeTetromino = new Tetromino();
        this._activeTetromino.toggleDraw(); 
        this._ableToRotate = true;
        setTimeout(this.runGame,500);
      }
    }
  }

  gameOver() {
    this._element.classList.toggle("game-over")
    this._element.innerHTML = "<h1>GAME OVER<h1>";
    console.log("Game Over!")
  }
}