export default class Board {
  constructor (element) {
    this._element = element;
    this.drawNewBoard(element);
    this._grid = this.createGrid();
  }

  get grid() {
    return this._grid;
    }

  drawNewBoard (element) {
    for (let y = 0; y <= 21; y++) {
      for (let x = 0; x <=9; x++) {
        element.innerHTML+=`\n<div class="board__block" id="${String(x)+"x"+String(y)}"></div>`;
      }
    }
  }
  createGrid () {
    let returnArr = [];
    for (let i = 0; i < 10; i++) {
      returnArr.push([]);
      for (let j = 0; j < 22; j++) {
        returnArr[i].push(0);
      } 
    }
    return returnArr;
  }

  get grid () {
    return this._grid;
  }

  mergeToGrid (blockCoords) {
    blockCoords.forEach(coord => this._grid[coord[0]][coord[1]] = 1);
  }

  isGameOver () {
    return this._grid.some(column => column[2]);
  }

  checkForFilledRows () {
    let rowTotal;
    const completedRows = [];
    for (let y = 21; y > 0; y--){
      rowTotal = 0
      for (let x = 0; x < 10; x++) {
        rowTotal+= this._grid[x][y];
      }
      if (rowTotal===10) completedRows.push(y);
    }
    if (completedRows.length) this.deleteRows(completedRows);
    return completedRows.length*2*100;
  }

  deleteRows (rows) {
    this.toggleGridDraw();
    for (let i = 0; i < rows.length; i++) {
      for (let x = 0; x < 10; x ++) {
        this._grid[x].splice(rows[i]+i,1);
        this._grid[x].unshift(0);
      }
    }
    this.toggleGridDraw();
  }
  toggleGridDraw () {
    for (let y = 0; y <= 21; y++) {
      for (let x = 0; x < 10; x++) {
        if (this._grid[x][y]) document.getElementById(`${x}x${y}`).classList.toggle("board__block--filled");
      }
    }
  }
}