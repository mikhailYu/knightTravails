function log(str) {
  return console.log(str);
}

let possibleMoves = [
  [1, 2],
  [2, 1],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

class GameBoard {
  constructor() {
    this.tilesArr = [];
  }

  createGameboard() {
    for (let x = 1; x <= 8; x++) {
      for (let y = 1; y <= 8; y++) {
        let tile = new Tile([x, y], this.tilesArr.length);
        this.tilesArr.push(tile);
      }
    }
  }

  travail(destination) {
    let tilesArr = this.tilesArr;
    let steps = 0;

    search();
    function search() {
      let currentPos = knight.position;
      tilesArr[filterFind(destination[0], destination[1])].isDestination = true;
      let closestTile = null;
      let closestTileID = null;

      possibleMoves.forEach((move) => {
        checkTile(move);
      });

      moveTo(closestTileID);

      function moveTo(ID) {
        let knightSpot = filterFind(knight.position[0], knight.position[1]);
        tilesArr[knightSpot].visited = true;
        knight.position = tilesArr[ID].coordinates;

        if (tilesArr[knightSpot].isDestination == true) {
          done();
        } else {
          log(knight.position);
          steps++;
          search();
        }
      }

      function done() {
        let stepNum;

        if (steps > 1) {
          stepNum = "steps";
        } else {
          stepNum = "step";
        }
        log("Your Knight made it in " + steps + " " + stepNum);
      }

      function checkTile(move) {
        let checkedArr = [currentPos[0] + move[0], currentPos[1] + move[1]];

        if (
          checkedArr[0] <= 0 ||
          checkedArr[1] <= 0 ||
          checkedArr[0] > 8 ||
          checkedArr[1] > 8
        ) {
          return;
        } else {
          getClosestTile(checkedArr);
        }
      }

      function getClosestTile(arr) {
        let tileId = filterFind(arr[0], arr[1]);
        let minusedBoth = Math.abs(
          destination[0] - arr[0] - (destination[1] - arr[1])
        );

        if (
          (closestTile == null || minusedBoth <= closestTile) &&
          tilesArr[tileId].visited == false
        ) {
          closestTile = minusedBoth;
          closestTileID = tileId;
        } else {
          return;
        }
      }

      function filterFind(x, y) {
        let filterFind = tilesArr;
        const filtered = filterFind.filter((obj) => {
          return obj.coordinates[0] === x && obj.coordinates[1] === y;
        });

        return filtered[0].index;
      }
    }
  }
}

class Tile {
  constructor(coordinates, index) {
    this.coordinates = coordinates;
    this.index = index;
    this.visited = false;
    this.isDestination = false;
  }
}

class Knight {
  constructor(position) {
    this.position = position;
  }
}

let gameBoard = new GameBoard();
let knight = new Knight([8, 8]);

gameBoard.createGameboard();

gameBoard.travail([1, 1]);
