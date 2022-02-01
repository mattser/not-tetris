// coordinates are y,x

class Game {
  constructor (board) {
    this._board = board;
    this._score = 0;
  }
  get board() {
    return this._board;
  }
}

class Board {
  constructor (element) {
    this._element = element;
    this._board = this.constructBoard()
  }
  get element() {
    return this._element;
  }
  constructBoard() {
    return new Array(22).fill(new Array(10).fill(0));
  }
  get board() {
    return this._board;
  }
  set board(newBoard) {
    this._board = newBoard
  }
  changeBoard(y,x,value) {
    board[y][x] = value;
  }
}



const board = new Board( document.querySelector(".board"));
const game = new Game(board);