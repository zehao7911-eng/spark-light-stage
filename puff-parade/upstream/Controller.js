import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';

class Controller {
  board;
  view;
  camera;
  scene;
  player;
  validMoves;
  pairs;
  searchResult;
  isGameInterrupted;
  view_x;
  view_y;
  boardGrid_x;
  boardGrid_y;

  constructor(board, view) {
    this.board = board;
    this.view = view;
    this.camera = view.getCamera();
    this.scene = view.getScene();
    this.renderer = view.getRenderer();
    this.player = 1;
    this.isGameInterrupted = false;
  }

  initController() {
    console.log('init Controller class');
    document.body.onload = this.view.constructBasicScene();
    this.onPointerMove = this.onPointerMove.bind(this);
    window.addEventListener('click', this.onPointerMove);

    // init
    this.initDiscs();
    this.board.recalcBoard(this.player);
    this.view.highlightValidMoves(this.board.validMoves, this.player);
    this.start();
    this.view.updateView();
  }

  calcPointsForPlayers() {
    this.board.calcPoints(1);
    this.board.calcPoints(2);
    console.log("player_1_points (balck): " + this.board.player_1_points +
      " " + "player_2_points (white): " + this.board.player_2_points);
  }

  initDiscs() {
    this.addDisc(3.1, 3.1, 3, 3, 1);
    this.addDisc(4.1, 3.1, 4, 3, 2);
    this.addDisc(3.1, 4.1, 3, 4, 2);
    this.addDisc(4.1, 4.1, 4, 4, 1);
  };

  onPointerMove(event) {

    this.isGameInterrupted = true;

    if (this.board.validMoves.length != 0) {
      let raycaster = new THREE.Raycaster();
      let pointer = new THREE.Vector2();

      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, this.camera);

      let intersects = raycaster.intersectObjects(this.scene.children);

      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.name == "square") {
          this.view_x = intersects[i].object.position.x
          this.view_y = intersects[i].object.position.y
          break;
        }
      }

      this.boardGrid_x = this.view_x.toFixed(0);
      this.boardGrid_y = this.view_y.toFixed(0);

      for (let move of this.board.validMoves) {
        let x = move[0];
        let y = move[1];
        if (this.boardGrid_x == x && this.boardGrid_y == y) {

          // current player
          this.addDisc(this.view_x, this.view_y, this.boardGrid_x, this.boardGrid_y, this.player);

          this.view.removeHighlightValidMoves(this.board.validMoves, this.player);

          //  flip disc/discs
          this.flip(this.boardGrid_x, this.boardGrid_y, this.player);

          // change player
          this.changePlayer();

          // new player 
          this.board.recalcBoard(this.player);

          this.view.highlightValidMoves(this.board.validMoves, this.player);

          this.renderer.render(this.scene, this.camera);

          break;
        }
      };

      this.randomBotMove();

    } else if (this.board.validMoves.length == 0) {
      this.calcPointsForPlayers();
      let message =
        "Player 1 (balck): " + this.board.player_1_points + "\n" +
        "Player 2 (white): " + this.board.player_2_points
      if (window.confirm(message)) {
        window.location.reload();
      }
    }
  }

  start() {
    setTimeout(() => {
      if (this.isGameInterrupted != true) {
        this.randomPlay();
        this.start();
        if (this.board.validMoves.length == 0) {
          this.calcPointsForPlayers();
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      }
    }, 1500);
  }

  reset() {
    this.player = 1;
    this.board.resetBoard();
    this.view.removeAllDiscs();
    this.initDiscs();
    this.board.recalcBoard(this.player);
    this.view.highlightValidMoves(this.board.validMoves, this.player);
    this.view.updateView();
  }

  randomBotMove() {

    setTimeout(() => {
      if (this.board.validMoves.length != 0) {

        if (this.playCorners().length > 0) {
          let pickedMove = this.playCorners();
          this.view_x = pickedMove[0] + pickedMove[0] * 0.02;
          this.view_y = pickedMove[1] + pickedMove[1] * 0.02;
  
          this.boardGrid_x = this.view_x.toFixed(0);
          this.boardGrid_y = this.view_y.toFixed(0);
          
        } else {
          let pickedMove = this.searchMin();
          this.view_x = pickedMove[0][0] + pickedMove[0][0] * 0.02;
          this.view_y = pickedMove[0][1] + pickedMove[0][1] * 0.02;
        
          this.boardGrid_x = this.view_x.toFixed(0);
          this.boardGrid_y = this.view_y.toFixed(0);
        }
        
        // let pickedMove = Math.floor(Math.random() * this.board.validMoves.length);

        // this.view_x = this.board.validMoves[pickedMove][0] + this.board.validMoves[pickedMove][0] * 0.02;
        // this.view_y = this.board.validMoves[pickedMove][1] + this.board.validMoves[pickedMove][1] * 0.02;

        for (let move of this.board.validMoves) {
          let x = move[0];
          let y = move[1];
          if (this.boardGrid_x == x && this.boardGrid_y == y) {

            // current player
            this.addDisc(this.view_x, this.view_y, this.boardGrid_x, this.boardGrid_y, this.player);

            this.view.removeHighlightValidMoves(this.board.validMoves, this.player);

            //  flip disc/discs
            this.flip(this.boardGrid_x, this.boardGrid_y, this.player);

            // change player
            this.changePlayer();

            // new player 
            this.board.recalcBoard(this.player);

            this.view.highlightValidMoves(this.board.validMoves, this.player);

            this.renderer.render(this.scene, this.camera);

            break;
          }
        };

      }

    }, 1200)
  }

  randomPlay() {

    if (this.board.validMoves.length != 0) {

      if (this.playCorners().length > 0) {
        let pickedMove = this.playCorners();
        this.view_x = pickedMove[0] + pickedMove[0] * 0.02;
        this.view_y = pickedMove[1] + pickedMove[1] * 0.02;

        this.boardGrid_x = this.view_x.toFixed(0);
        this.boardGrid_y = this.view_y.toFixed(0);
        
      } else {
        let pickedMove = this.searchMin();
        this.view_x = pickedMove[0][0] + pickedMove[0][0] * 0.02;
        this.view_y = pickedMove[0][1] + pickedMove[0][1] * 0.02;
      
        this.boardGrid_x = this.view_x.toFixed(0);
        this.boardGrid_y = this.view_y.toFixed(0);
      }

      // let pickedMove = Math.floor(Math.random() * this.board.validMoves.length);

      // let view_x = this.board.validMoves[pickedMove][0] + this.board.validMoves[pickedMove][0] * 0.02;
      // let view_y = this.board.validMoves[pickedMove][1] + this.board.validMoves[pickedMove][1] * 0.02;

      for (let move of this.board.validMoves) {
        let x = move[0];
        let y = move[1];
        if (this.boardGrid_x == x && this.boardGrid_y == y) {

          // current player
          this.addDisc(this.view_x, this.view_y, this.boardGrid_x, this.boardGrid_y, this.player);

          this.view.removeHighlightValidMoves(this.board.validMoves, this.player);

          //  flip disc/discs
          this.flip(this.boardGrid_x, this.boardGrid_y, this.player);

          // change player
          this.changePlayer();

          // new player 
          this.board.recalcBoard(this.player);

          this.view.highlightValidMoves(this.board.validMoves, this.player);

          this.renderer.render(this.scene, this.camera);

          break;
        }
      };
    }
  }

  changePlayer() {
    if (this.player == 1) {
      this.player = 2;
    } else if (this.player == 2) {
      this.player = 1;
    }
  }

  addDisc(view_x, view_y, boardGrid_x, boardGrid_y, state) {
    this.board.setBoardGrid(boardGrid_x, boardGrid_y, state);
    this.view.makeDisc(view_x, view_y, boardGrid_x, boardGrid_y, state);
  }

  removeDisc(boardGrid_x, boardGrid_y) {
    let state = 0;
    this.board.setBoardGrid(boardGrid_x, boardGrid_y, state);
    this.view.removeDisc(boardGrid_x, boardGrid_y);
  }

  flipDisc(boardGrid_x, boardGrid_y, player) {
    this.view.changeStateOfDisc(boardGrid_x, boardGrid_y, player);
    this.board.setBoardGrid(boardGrid_x, boardGrid_y, player);
  }

  flip(boardGrid_x, boardGrid_y, player) {
    this.board.pairs.forEach(element => {
      let key = element[1];
      let x_in_key = key[0][0];
      let y_in_key = key[0][1];

      if (x_in_key == boardGrid_x && y_in_key == boardGrid_y) {
        let discsToFlip = element.slice(3)[0];
        discsToFlip.forEach(disc => {
          this.flipDisc(disc[0], disc[1], player);
        });
      }
    });
  }

  searchMin() {
    // search for move with max opponent discs
    let max = 100;
    let move;
    this.board.pairs.forEach(element => {
      let discsToFlip = element.slice(3)[0];
      if (discsToFlip.length < max) {
        max = discsToFlip.length;
        move = element[1];
      }
    });
    return move;
  }

  playCorners() {
    let result = [];
    for (let move of this.board.validMoves) {
      let x = move[0];
      let y = move[1];
      if (x == 0 && y == 0) {
        result = move;
        break;
      } else if (x == 0 && y == 7) {
        result = move;
        break;
      } else if (x == 7 && y == 0) {
        result = move;
        break;
      } else if (x == 7 && y == 7) {
        result = move;
        break;
      } 
    }
    return result;
  }

}

export { Controller };
