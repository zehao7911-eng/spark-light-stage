class Board {
  searchResult;
  validMoves;
  pairs;
  player_1_points;
  player_2_points;

  boardGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]

  constructor() {
    this.initBaord();
  };

  initBaord(player) {
    this.recalcBoard(player);
    this.calcPoints(1);
    this.calcPoints(2);
    console.log('init Board class');
  }

  recalcBoard(player) {
    this.searchResult = this.findValidMoves(player);
    this.validMoves = this.searchResult[0];
    this.pairs = this.searchResult[1];
  }

  calcPoints(player) {
    if (player == 1) {
      this.player_1_points = this.findAllPlayersDiscs(1).length;
    } else if (player == 2) {
      this.player_2_points = this.findAllPlayersDiscs(2).length;
    }
  }

  printBoardGrid() {
    console.table(this.boardGrid);
  }

  getBoardGrid() {
    return this.boardGrid;
  }

  setBoardGrid(x, y, state) {
    this.boardGrid[x][y] = state;
  }

  resetBoard() {
    this.boardGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }

  findAllPlayersDiscs(player) {
    let playerDiscs = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.boardGrid[i][j] == player) {
          let discPosition = [i, j];
          playerDiscs.push(discPosition);
        }
      }
    }
    return playerDiscs;
  }

  findValidMoves(player) {
    let validMoves = [];
    let pairs = [];
    let playerDiscs = this.findAllPlayersDiscs(player);

    playerDiscs.forEach(disc => {
      let horizontalValidMoves = this.searchHorizontal(disc);
      if (horizontalValidMoves.length != 0) {
        horizontalValidMoves[0].forEach(element => {
          validMoves.push(element);
        });

        horizontalValidMoves[1].forEach(element => {
          pairs.push(element);
        });
      }

      let verticalValidMoves = this.searchVertical(disc);
      if (verticalValidMoves.length != 0) {
        verticalValidMoves[0].forEach(element => {
          validMoves.push(element);
        });

        verticalValidMoves[1].forEach(element => {
          pairs.push(element);
        });
      }

      let diagonalRightValidMoves = this.searchDiagonalRight(disc);
      if (diagonalRightValidMoves.length != 0) {
        diagonalRightValidMoves[0].forEach(element => {
          validMoves.push(element);
        });

        diagonalRightValidMoves[1].forEach(element => {
          pairs.push(element);
        });

      }

      let diagonalLeftValidMoves = this.searchDiagonalLeft(disc);
      if (diagonalLeftValidMoves.length != 0) {
        diagonalLeftValidMoves[0].forEach(element => {
          validMoves.push(element);
        });

        diagonalLeftValidMoves[1].forEach(element => {
          pairs.push(element);
        });

      }

    });

    return [validMoves, pairs];
  }

  searchHorizontal(disc) {
    let horizontalValidMoves = [];
    let horizontalValidMovesRight = [];
    let horizontalDiscToFlipRight = [];
    let horizontalDiscToFlipLeft = [];
    let horizontalValidMovesLeft = [];
    let pairs = [];
    let boardGrid = this.boardGrid;

    function serachRight(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = x + 1; i < 7; i++) {
        if (boardGrid[i][y] != 0 && boardGrid[i][y] != player) {
          let discToFlip = [i, y];
          horizontalDiscToFlipRight.push(discToFlip);

          if (boardGrid[i][y] != player && boardGrid[i + 1][y] == 0) {
            let position = [i + 1, y];
            horizontalValidMoves.push(position);
            horizontalValidMovesRight.push(position);
            break;
          }

        } else if (boardGrid[i][y] == 0 || boardGrid[i][y] == player) {
          break;
        }
      }
    }

    function searchLeft(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = x - 1; i > 0; i--) {
        if (boardGrid[i][y] != 0 && boardGrid[i][y] != player) {
          let discToFlip = [i, y];
          horizontalDiscToFlipLeft.push(discToFlip);

          if (boardGrid[i][y] != player && boardGrid[i - 1][y] == 0) {
            let position = [i - 1, y];
            horizontalValidMoves.push(position);
            horizontalValidMovesLeft.push(position);
            break;
          }

        } else if (boardGrid[i][y] == 0 || boardGrid[i][y] == player) {
          break;
        }
      }
    };

    serachRight(disc);
    searchLeft(disc);

    if (horizontalValidMovesRight.length != 0) {
      let pair = ["key", horizontalValidMovesRight, "value", horizontalDiscToFlipRight]
      pairs.push(pair);
    }

    if (horizontalValidMovesLeft.length != 0) {
      let pair = ["key", horizontalValidMovesLeft, "value", horizontalDiscToFlipLeft]
      pairs.push(pair);
    }

    return [horizontalValidMoves, pairs];
  }

  searchVertical(disc) {
    let verticalValidMoves = [];
    let verticalValidMovesUp = [];
    let verticalDiscToFlipUp = [];
    let verticalDiscToFlipDown = [];
    let verticalValidMovesDown = [];
    let pairs = [];
    let boardGrid = this.boardGrid;

    function searchUp(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = y + 1; i < 7; i++) {
        if (boardGrid[x][i] != 0 && boardGrid[x][i] != player) {
          let discToFlip = [x, i];
          verticalDiscToFlipUp.push(discToFlip);

          if (boardGrid[x][i] != player && boardGrid[x][i + 1] == 0) {
            let position = [x, i + 1];
            verticalValidMoves.push(position);
            verticalValidMovesUp.push(position);
            break;
          }

        } else if (boardGrid[x][i] == 0 || boardGrid[x][i] == player) {
          break;
        }
      }
    }

    function searchDown(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = y - 1; i > 0; i--) {
        if (boardGrid[x][i] != 0 && boardGrid[x][i] != player) {
          let discToFlip = [x, i];
          verticalDiscToFlipDown.push(discToFlip);

          if (boardGrid[x][i] != player && boardGrid[x][i - 1] == 0) {
            let position = [x, i - 1];
            verticalValidMoves.push(position);
            verticalValidMovesDown.push(position);
            break;
          }

        } else if (boardGrid[x][i] == 0 || boardGrid[x][i] == player) {
          break;
        }
      }
    }

    searchUp(disc);
    searchDown(disc);

    if (verticalValidMovesUp.length != 0) {
      let pair = ["key", verticalValidMovesUp, "value", verticalDiscToFlipUp]
      pairs.push(pair);
    }

    if (verticalValidMovesDown.length != 0) {
      let pair = ["key", verticalValidMovesDown, "value", verticalDiscToFlipDown]
      pairs.push(pair);
    }

    return [verticalValidMoves, pairs];
  }

  searchDiagonalRight(disc) {
    let diagonalValidMoves = [];
    let diagonalValidMovesUp = [];
    let diagonalDiscToFlipUp = [];
    let diagonalDiscToFlipDown = [];
    let diagonalValidMovesDown = [];
    let pairs = [];
    let boardGrid = this.boardGrid;

    function searchUp(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y + 1;

      for (let i = x - 1; i > 0; i--) {
        if (boardGrid[i][j] != 0 && boardGrid[i][j] != player) {
          let discToFlip = [i, j];
          diagonalDiscToFlipUp.push(discToFlip);

          if (boardGrid[i][j] != player && boardGrid[i - 1][j + 1] == 0) {
            let position = [i - 1, j + 1];
            diagonalValidMoves.push(position);
            diagonalValidMovesUp.push(position);
            break;
          }

        } else if (boardGrid[i][j] == 0 || boardGrid[i][j] == player) {
          break;
        }
        j++;
      }
    }

    function searchDown(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y - 1;

      for (let i = x + 1; i < 7; i++) {
        if (boardGrid[i][j] != 0 && boardGrid[i][j] != player) {
          let discToFlip = [i, j];
          diagonalDiscToFlipDown.push(discToFlip);

          if (boardGrid[i][j] != player && boardGrid[i + 1][j - 1] == 0) {
            let position = [i + 1, j - 1];
            diagonalValidMoves.push(position);
            diagonalValidMovesDown.push(position);
            break;
          }

        } else if (boardGrid[i][j] == 0 || boardGrid[i][j] == player) {
          break;
        }
        j--;
      }
    }

    searchUp(disc);
    searchDown(disc);

    if (diagonalValidMovesUp.length != 0) {
      let pair = ["key", diagonalValidMovesUp, "value", diagonalDiscToFlipUp]
      pairs.push(pair);
    }

    if (diagonalValidMovesDown.length != 0) {
      let pair = ["key", diagonalValidMovesDown, "value", diagonalDiscToFlipDown]
      pairs.push(pair);
    }

    return [diagonalValidMoves, pairs];
  }

  searchDiagonalLeft(disc) {
    let diagonalValidMoves = [];
    let diagonalValidMovesUp = [];
    let diagonalDiscToFlipUp = [];
    let diagonalDiscToFlipDown = [];
    let diagonalValidMovesDown = [];
    let pairs = [];
    let boardGrid = this.boardGrid;

    function searchUp(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y - 1;

      for (let i = x - 1; i > 0; i--) {
        if (boardGrid[i][j] != 0 && boardGrid[i][j] != player) {
          let discToFlip = [i, j];
          diagonalDiscToFlipUp.push(discToFlip);

          if (boardGrid[i][j] != player && boardGrid[i - 1][j - 1] == 0) {
            let position = [i - 1, j - 1];
            diagonalValidMoves.push(position);
            diagonalValidMovesUp.push(position);
            break;
          }

        } else if (boardGrid[i][j] == 0 || boardGrid[i][j] == player) {
          break;
        }
        j--;
      }
    }

    function searchDown(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y + 1;

      for (let i = x + 1; i < 7; i++) {
        if (boardGrid[i][j] != 0 && boardGrid[i][j] != player) {
          let discToFlip = [i, j];
          diagonalDiscToFlipDown.push(discToFlip);

          if (boardGrid[i][j] != player && boardGrid[i + 1][j + 1] == 0) {
            let position = [i + 1, j + 1];
            diagonalValidMoves.push(position);
            diagonalValidMovesDown.push(position);
            break;
          }

        } else if (boardGrid[i][j] == 0 || boardGrid[i][j] == player) {
          break;
        }
        j++;
      }
    }

    searchUp(disc);
    searchDown(disc);

    if (diagonalValidMovesUp.length != 0) {
      let pair = ["key", diagonalValidMovesUp, "value", diagonalDiscToFlipUp]
      pairs.push(pair);
    }

    if (diagonalValidMovesDown.length != 0) {
      let pair = ["key", diagonalValidMovesDown, "value", diagonalDiscToFlipDown]
      pairs.push(pair);
    }

    return [diagonalValidMoves, pairs];
  }
}

export { Board };
