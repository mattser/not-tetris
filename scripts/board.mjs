export default class Board {
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