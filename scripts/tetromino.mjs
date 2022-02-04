export default class Tetromino {
  constructor () {
    this._types = ["L","T","Square","Pipe","Skew"];
    this._type = this._types[Math.floor(Math.random()*this._types.length)];
    console.log(this._type);
    this._rotation = 0;
    this._blockPhases = this.setBlockPhases(this._type);
    this._blockPositions = this.setInitialSpawn();
    
  }
  get type () {
    return this._type;
  }
  get rotation () {
    return this._rotation;
  }
  set rotation (value) {
    this._rotation = value;
  }
  get blockPositions () {
    return this._blockPositions;
  }
  setInitialSpawn() {
    return this._blockPhases[0].map(coord => {
      coord[0] += 3;
      return coord;
    })
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
    for (const coord of this._blockPositions) {
      document.getElementById(`${coord[0]}x${coord[1]}`).classList.toggle("board__block--filled");
    }
  }
  rotate() {
    // Get current coordinates of the block
    this.toggleDraw();
    this._rotation++;
    const currentPosition = this._blockPositions;
    let index;
    let x = [];
    let y = [];
    for (const coord of currentPosition) {
      x.push(coord[0]);
      y.push(coord[1]);
    }
    // Make some relative grid, i.e, smallest position to max
    const minX = Math.min(...x);
    const minY = Math.min(...y);

    for (let i = 0; i < this._blockPhases.length; i++) {
      if (!(this.rotation%i)) {
        index = i;
      }
    }

    this._blockPositions = this._blockPhases[index].map(coord => {
      coord[0] += minX;
      coord[1] += minY;
      return coord;
    })
    
    this.toggleDraw();
  }
  translate(direction) {
    this.toggleDraw();
    const currentPosition = this._blockPositions;
    switch(direction) {
      case "down":
        this._blockPositions = currentPosition.map(coord => {
          return [coord[0],coord[1]+1];
        })
        break;
      case "left":
        this._blockPositions = currentPosition.map(coord => {
          return [coord[0]-1,coord[1]];
        })
        break;
      case "right":
        this._blockPositions = currentPosition.map(coord => {
          return [coord[0]+1,coord[1]];
        })
        break;
    }
    this.toggleDraw();
  }
  isAbleToMove(direction,currentGrid) {
    const currentPosition = this._blockPositions;
    switch (direction) {
      case "down":
        return currentPosition.every(coord => {
          return coord[1] <= 20 && !(currentGrid[coord[0]][coord[1]+1] );
        })
      case "left":
        return currentPosition.every(coord => {
          return coord[0] >= 1 && !(currentGrid[coord[0]-1][coord[1]] );
        })
      case "right":
        return currentPosition.every(coord => {
          return coord[0] <= 8 && !(currentGrid[coord[0]+1][coord[1]] );
        })
    }
  }
}



// Rotate Right
  // Y = inverted X
  // X = Y

