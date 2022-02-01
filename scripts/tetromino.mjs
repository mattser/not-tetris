export default class Tetromino {
  constructor () {
    this._types = ["L","T","Square","Pipe","Skew"];
    this._type = this._types[Math.floor(Math.random()*this._types.length)];
    this._rotation = 0;
    this._blockPositions = this.setInitialSpawn();
    console.log(this._type);
    console.log(this._blockPositions);
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
    switch (this._type) {
      case "L":
        return [[3,0],[4,0],[5,0],[3,1]];
      case "T":
        return [[3,0],[4,0],[5,0],[4,1]];
      case "Square":
        return [[4,0],[4,1],[5,0],[5,1]];
      case "Pipe":
        return [[3,0],[4,0],[5,0],[6,0]];
      case "Skew":
        return [[5,0],[4,1],[6,0],[5,1]];
    }
  }
  toggleDraw() {
    for (const coord of this._blockPositions) {
      document.getElementById(`${coord[0]}x${coord[1]}`).classList.toggle("board__block--filled");
    }
  }
  rotate() {
    // Get current coordinates of the block
    const currentPosition = this._blockPositions;
    let x = [];
    let y = [];
    for (const coord of currentPosition) {
      x.push(coord[0]);
      y.push(coord[1]);
    }
    console.log(x,y)
    // Make some relative grid, i.e, smallest position to max
    const minX = Math.min(...x);
    const minY = Math.min(...y);
    console.log(minX,minY)
    x = x.map(item => item-minX);
    y = y.map(item => item-minY);
    console.log(x,y)
    const xNew = y.map(item => item+minX);
    const yNew = x.map(item => item+minY).reverse();
    console.log(xNew,yNew);
    console.log(typeof xNew)
    console.log(xNew[1]);
    const newCoords = [];
    for (let i = 0; i < yNew.length; i++){
      newCoords.push([xNew[i],yNew[i]])
    }

    this._blockPositions = newCoords;
    // Translate block onto relative grid
    // Perform rotation
    // re-transcribe
  }
}



// Rotate Right
  // Y = inverted X
  // X = Y
