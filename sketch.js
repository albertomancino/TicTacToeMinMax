// GLOBAL VARS
let canvas_dim = 400;
let canv_ctr = canvas_dim / 2;
let tris_cell_dim = 100;
var button;
var reasoning = false;
var flag = 0;


function setup() {
  var canvas = createCanvas(canvas_dim, canvas_dim);
  // link canvas to an element in the page as its child
  canvas.parent("canvas_container")
  game = new Tris(canvas_dim, tris_cell_dim);
  translate(100, 100);
  AI = new MinMax();
}

function draw() {
  background(220);
  game.draw_grid();
  game.draw_state();

  if (flag == 500){
    print("STATO: ", game.state);
    flag = 0;
  }
  else
    flag ++;
  // if game is not in the final state
  if (game.final != 1) {
    // AI moves
    if (game.state.player_turn == 'O' ) {

      move_AI = AI.nextMove(game);
      //print("mossa scelta: ", move_AI);
      game.state = game.result(game.state, move_AI, 'O');

      /*// random choice
      actions = game.action(game.state);
      let move = Math.floor(Math.random() * actions.length);
      game.result(actions[move], game.player_turn);*/


      // check if state is a final state
      if (game.check_final_state(game.state)) {
        game.final = 1;
      }
    }
  }
  // game ended
  else {
    game.draw_solution(game.solution1, game.solution2);
  }

}
// function called when the mouse is pressed
function mouseClicked() {
  // mouse click must be considered only under specific conditions:
  // - it's user turn
  // - game is not ended
  if (game.state.player_turn == 'X' && game.final != 1) {

    let boardX = canv_ctr - 150;
    let boardY = canv_ctr - 150;
    let row = game.cell_interpreter(mouseY, boardY);
    let col = game.cell_interpreter(mouseX, boardX);
    // if mouse position has been interpreted as in a cell
    if(row != null && col != null){
      // se la cella è libera
      if (game.state.board[row][col] == null) {
        // load the new state in the game
        game.state = game.result(game.state, [row, col], game.state.player_turn);

        if (game.check_final_state(game.state)) {
          game.final = 1;
        }
      }
    }
  }
}

function restart() {
  game = new Tris(canvas_dim, tris_cell_dim);
}
