class MinMax {

  // depth argument refers to the tree search max depth
  constructor(depth = null){
    if (depth < 0) {
      console.log("Invalid depth for MinMax algorithm. Depth must be positive.\nMinMax - constructor")
      depth = null;
    }
    else
      this.depth = depth;
  }

  nextMove(problem){
    print("nextMove chiamata");
    var move = null;

    // all possibile actions
    let fringe = problem.action(problem.state);
    this.min_max_search(problem, fringe);

    return move;
  }

  min_max_search(problem, fringe){

    var move = null;

    fringe.forEach((item, i) => {
      console.log("fringe: ", item);
      var childState = problem.result(item, problem.player_turn);
      console.log("nuovo stato: ", childState);
    });

    return move;
  }
}
