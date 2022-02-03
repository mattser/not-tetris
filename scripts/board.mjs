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
    // return [...new Array(10).fill([...new Array(22).fill(0)])];
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
  set grid (value) {
    this._grid = value;
  }
  mergeToGrid(blockCoords) {
    for (let i = 0; i < blockCoords.length; i++) {
      let x = blockCoords[i][0];
      let y = blockCoords[i][1];
      this._grid[x][y] = 1;
    }
  }
  isGameOver() {
    let endLine = [];
    for (let i = 0; i < 10; i++) {
      endLine.push(this._grid[i][2])
    }
    return endLine.some(item => item);
  }
  checkForFilledRows() {
    let rowTotal;
    const completedRows = [];
    for (let y = 21; y > 0; y--){
      rowTotal = 0
      for (let x = 0; x < 10; x++) {
        rowTotal+= this._grid[x][y];
      }
      if (rowTotal===10) {
        
        completedRows.push(y);
        console.log(completedRows);
      }
    }
    if (completedRows.length > 0) {
      console.log(this._grid);
      this.deleteRows(completedRows);
      console.log(this._grid);
      return completedRows.length*2*100;
    } else {
      return 0;
    }
  }
  deleteRows(rows) {
    this.toggleGridDraw();
    for (let i = 0; i < rows.length; i++) {
      for (let x = 0; x < 10; x ++) {
        this._grid[x].splice(rows[i]+i,1);
        this._grid[x].unshift(0);
        console.log('Deleted Row');
      }
    }
    this.toggleGridDraw();
  }
  toggleGridDraw() {
    for (let y = 0; y <= 21; y++) {
      for (let x = 0; x < 10; x++) {
        if (this._grid[x][y]) document.getElementById(`${x}x${y}`).classList.toggle("board__block--filled");
      }
    }
  }
}