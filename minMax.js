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

  nextMove(agent){
    print("nextMove chiamata");

    // all possibile actions
    let fringe = agent.action(agent.state);
    var move = this.min_max_search(agent, fringe);

    return move;
  }

  min_max_search(agent, fringe){
    print("-----------------------------------------------")
    print("Min Max Search. Fringe lenght: ", fringe.length);
    print("Board pre min max search: ", agent.state.board[0],agent.state.board[1],agent.state.board[2]);

    var bestMove = null;

    fringe.forEach((move, i) => {
      print("compute evolution with move ", move);
      print("and turn: ", agent.state.player_turn);
      print("and board: ", agent.state.board[0],agent.state.board[1],agent.state.board[2]);
      // compute the evolution of the state
      var childState = agent.result(move, agent.state.player_turn);

      console.log("nuovo stato: ",move, "\n", childState.board[0],childState.board[1],childState.board[2]);
      console.log("nuovo turno: ", childState.player_turn);
      console.log("stato dell'agent: ",move, "\n", agent.state.board[0],agent.state.board[1],agent.state.board[2]);

      // check if the new state is a final state
      //if(agent.check_final_state(childState) != 0){
        //var heuristic = agent.heuristic(childState,'O');
        //print('Euristica: ', heuristic);
      //}
      // if is a final state compute heuristic

      // if is not a final state continue exploring state space




      //print("Iterazione: ", i);
      //console.log("fringe: ", move);

      bestMove = move;
    });

    console.log("ritornato: ", bestMove);
    return bestMove;
  }
}
