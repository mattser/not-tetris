export default class Tetromino {
  constructor () {
    this._types = ["L","T","Square","Pipe","Skew"];
    this._type = this._types[Math.floor(Math.random()*this._types.length)];
    this._rotation = 0;
    this._blockPhases = this.setBlockPhases(this._type);
    this._blockPositions = this._blockPhases[0].map(coord => [coord[0]+3,coord[1]])
    
  }
  get blockPositions () {
    return this._blockPositions;
  }

  setBlockPhases(tetrominoType) {
    switch (tetrominoType) {
      case "L":
        return [
          [[0,0],[1,0],[2,0],[0,1]],
          [[0,0],[1,0],[1,1],[1,2]],
          [[0,1],[1,1],[2,1],[2,0]],
          [[0,0],[0,1],[0,2],[1,2]]
        ];
      case "T":
        return [
          [[0,0],[0,1],[0,2],[1,1]],
          [[1,0],[1,1],[1,2],[0,1]],
          [[0,1],[1,1],[2,1],[1,0]],
          [[0,0],[0,1],[0,2],[1,1]]
        ];
      case "Square":
        return [
          [[0,0],[0,1],[1,0],[1,1]],
          [[0,0],[0,1],[1,0],[1,1]]
        ];
      case "Skew":
        return [
          [[1,0],[2,0],[0,1],[1,1]],
          [[0,0],[0,1],[1,1],[1,2]]
        ];
      case "Pipe":
        return [
          [[0,0],[1,0],[2,0],[3,0]],
          [[0,0],[0,1],[0,2],[0,3]]
        ];
    }
  }

  toggleDraw() {
    this._blockPositions.forEach(coord => {
      document.getElementById(`${coord[0]}x${coord[1]}`).classList.toggle("board__block--filled");
    })
  }

  rotate() {
    this.toggleDraw();
    this._rotation++;
    let index = this._rotation % this._blockPhases.length;
    const minX = Math.min(...this._blockPositions.map(coord => coord[0]));
    const minY = Math.min(...this._blockPositions.map(coord => coord[1]));
    this._blockPositions = this._blockPhases[index].map(coord => [coord[0]+=minX,coord[1]+=minY] );   
    this.toggleDraw();
  }

  translate(direction) {
    this.toggleDraw();
    switch(direction) {
      case "down":
        this._blockPositions = this._blockPositions.map(coord => [coord[0],coord[1]+1] );
        break;
      case "left":
        this._blockPositions = this._blockPositions.map(coord => [coord[0]-1,coord[1]] );
        break;
      case "right":
        this._blockPositions = this._blockPositions.map(coord => [coord[0]+1,coord[1]] );
        break;
    }
    this.toggleDraw();
  }
  isAbleToMove(direction,currentGrid) {
    switch (direction) {
      case "down":
        return this._blockPositions.every(coord => coord[1] <= 20 && !(currentGrid[coord[0]][coord[1]+1] ) );
      case "left":
        return this._blockPositions.every(coord => coord[0] >= 1 && !(currentGrid[coord[0]-1][coord[1]] ) );
      case "right":
        return this._blockPositions.every(coord => coord[0] <= 8 && !(currentGrid[coord[0]+1][coord[1]] ) );
    }
  }
}