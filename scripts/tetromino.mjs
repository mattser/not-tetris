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
}