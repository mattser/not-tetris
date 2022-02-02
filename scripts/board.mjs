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
    console.log(blockCoords)
    for (let i = 0; i < blockCoords.length; i++) {
      let x = blockCoords[i][0];
      let y = blockCoords[i][1];
      console.log(x,y)
      this._grid[x][y] = 1;
    }
    console.log("Merged!")
    console.log(this._grid);
  }
}