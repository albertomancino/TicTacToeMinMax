class Tris {

  constructor(canv_ctr, tris_cell_dim){

    // random choice the first player
    var rand = Math.floor(Math.random()*2);
    var players = ['X','O'];

    this.state = {
      // default board is empty
      board:  [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],

      // first player is X by default
      player_turn: players[rand]
    };

    this.canvas_dim = canvas_dim;
    // canvas center coordinate
    this.canv_ctr = canvas_dim / 2;
    // cell dimension is passed by the constructor
    this.tris_cell_dim = tris_cell_dim;
    // final state, default is 0
    this.final = 0;
    // solution line coordinates
    this.solution1 = null;
    this.solution2 = null;
  }

  draw_grid() {
    strokeWeight(2);
    translate(this.canv_ctr - 150, this.canv_ctr - 150);
    // grid external border
    square(0, 0, 300);
    // grid rows
    line(0, this.tris_cell_dim, this.tris_cell_dim * 3, this.tris_cell_dim);
    line(0, this.tris_cell_dim * 2, this.tris_cell_dim * 3, this.tris_cell_dim * 2);
    // grid cols
    line(this.tris_cell_dim, 0, this.tris_cell_dim, this.tris_cell_dim * 3);
    line(this.tris_cell_dim * 2, 0, this.tris_cell_dim * 2, this.tris_cell_dim * 3);
    // resetting stroke weight
    strokeWeight(1);
  }
  // returns the player id
  player_id(player) {
    if (player == 'X') {
      return 1;
    }
    if (player == 'O') {
      return 2;
    }
  }
  // returns the player name
  player_name(id) {
    if (id == 1) {
      return "X";
    } else {
      return "O";
    }
  }
  // switch player turn
  change_turn(state) {
    if (state.player_turn == 'X') {
      state.player_turn = 'O';
    } else {
      state.player_turn = 'X';
    }
  }
  // return the row or col index given the x or y coordinate and offset
  cell_interpreter(value, offset) {

    let pos = value - offset;
    if (pos > 0 && pos < tris_cell_dim * 3) {
      if (pos / tris_cell_dim > 2) {
        return 2;
      }
      if (pos / tris_cell_dim > 1) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  // TODO ???
  action_interpreter(x, y) {
    let row = 0;
    let col = 0;
  }

  action(state) {
    var board = state.board;
    let actions = []
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] == null) {
          append(actions, [row, col]);
        }
      }
    }
    return actions;
  }

  result(state, action, player) {
    let row = action[0];
    let col = action[1];

    var newState = this.copyState(state);

    newState.board[row][col] = this.player_id(player);
    this.change_turn(newState);

    return newState;
  }

  draw_player(player_id, x, y) {
    let x_pos = y * tris_cell_dim;
    let y_pos = x * tris_cell_dim;
    let symbol_dim = tris_cell_dim / 2;
    // X player
    if (player_id == 1) {
      line(x_pos + (tris_cell_dim - symbol_dim) / 2, y_pos + (tris_cell_dim - symbol_dim) / 2, x_pos + (tris_cell_dim - symbol_dim) / 2 + symbol_dim, y_pos + (tris_cell_dim - symbol_dim) / 2 + symbol_dim);
      line(x_pos + (tris_cell_dim - symbol_dim) / 2 + symbol_dim, y_pos + (tris_cell_dim - symbol_dim) / 2, x_pos + (tris_cell_dim - symbol_dim) / 2, y_pos + (tris_cell_dim - symbol_dim) / 2 + symbol_dim);
    }
    // O player
    if (player_id == 2) {
      circle(x_pos + tris_cell_dim / 2, y_pos + tris_cell_dim / 2, symbol_dim);
    }
  }

  draw_state() {
    var board = this.state.board;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.state.board[row][col] != null) {
          this.draw_player(this.state.board[row][col], row, col);
        }
      }
    }
  }

  draw_solution(sol1, sol2) {

    if (sol1 !== null && sol2 != null){

      let x1 = sol1[1] * this.tris_cell_dim + this.tris_cell_dim / 2;
      let y1 = sol1[0] * this.tris_cell_dim + this.tris_cell_dim / 2;
      let x2 = sol2[1] * this.tris_cell_dim + this.tris_cell_dim / 2;
      let y2 = sol2[0] * this.tris_cell_dim + this.tris_cell_dim / 2;

      stroke('red');
      strokeWeight(4);
      line(x1, y1, x2, y2);
      stroke(0);
      strokeWeight(1);
    }
  }

  /*
   * ritorna 0 se la partita non è terminata
   * ritorna 1 se la partita è terminata con un pareggio
   * ritorna 2 se vince X
   * ritorna 3 se vince O
   */
  check_final_state(state) {
     let check = 0;
     var board = state.board;
     // CHECK ROWS
     if (board[0][0] != null && board[0][0] == board[0][1] && board[0][1] == board[0][2]) {
       this.solution1 = [0, 0];
       this.solution2 = [0, 2];

       return board[0][0];
     }
     if (board[1][0] != null && board[1][0] == board[1][1] && board[1][1] == board[1][2]) {
       this.solution1 = [1, 0];
       this.solution2 = [1, 2];
       return board[1][0];
     }
     if (board[2][0] != null && board[2][0] == board[2][1] && board[2][1] == board[2][2]) {
       this.solution1 = [2, 0];
       this.solution2 = [2, 2];
       return board[2][0];
     }

     // CHECK COLS
     if (board[0][0] != null && board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
       this.solution1 = [0, 0];
       this.solution2 = [2, 0];
       return board[0][0];
     }
     if (board[0][1] != null && board[0][1] == board[1][1] && board[1][1] == board[2][1]) {
       this.solution1 = [0, 1];
       this.solution2 = [2, 1];
       return board[0][1];
     }
     if (board[0][2] != null && board[0][2] == board[1][2] && board[1][2] == board[2][2]) {
       this.solution1 = [0, 2];
       this.solution2 = [2, 2];
       return board[0][2];
     }

     // CHECK DIAG1
     if (board[0][0] != null && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
       this.solution1 = [0, 0];
       this.solution2 = [2, 2];
       return board[0][0];
     }

     // CHECK DIAG2
     if (board[0][2] != null && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
       this.solution1 = [2, 0];
       this.solution2 = [0, 2];
       return board[0][2];
     }

     let actions = this.action(state);
     if (actions.length == 0) {
       this.solution1 = null;
       this.solution2 = null;
       return -1;
     }

     this.solution1 = null;
     this.solution2 = null;

     return 0;
   }

  /*
  * per un dato player restituisce
  * +1 in caso di stato vittorioso
  * -1 in caso di stato perdente
  * 0 altrimenti
  */
  heuristic(state, depth = 0) {

    // search depth can influence the heuristic
    var depth_coefficient = 9 - depth;

    let state_value = this.check_final_state(state);
    // pareggio o partita in corso
    if (state_value === 0 || state_value === -1) {
      return 0;
    }
    // vittoria X
    else if (state_value === 1) {
      return 1*depth_coefficient;
    }
    // vittoria O
    else {
      return -1*depth_coefficient;
    }
  }

  copyState(state){

    var newState = {
      board: [[null,null,null],[null,null,null],[null,null,null]],
      player_turn: state.player_turn
    }
    // copying board value by value
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        newState.board[i][j] = state.board[i][j];
      }
    }

    return newState;
  }
}
