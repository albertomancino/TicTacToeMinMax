class MinMax {

  // depth argument refers to the tree search max depth
  constructor(player, playerAI, depth = null){

    this.player = player;
    this.AI = playerAI;

    if (depth < 0) {
      console.log("Invalid depth for MinMax algorithm. Depth must be positive.\nMinMax - constructor")
      depth = null;
    }
    else
      this.depth = depth;


  }

  nextMove(agent){
    print("nextMove chiamata");

    var move = this.min_max_search(agent, agent.state);

    return move[0];
  }

  min_max_search(agent, state){

    // all possible actions
    var fringe = agent.action(state);

    print("-----------------------------------------------")
    print("Min Max Search. Fringe lenght: ", fringe.length);
    print("Mosse possibili: ", fringe);
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!");
    print("Stato attuale: ", state.board);

    // move that will be chosen
    var bestMove = null;
    var bestHeuristic = 0;

    // compute for all possible actions in the fringe list
    fringe.forEach((move, i) => {

      var heuristic;

      // compute the evolution of the state
      var childState = agent.result(state, move, state.player_turn);

      print('analizzo mossa: ', move, 'per il player:', state.player_turn);
      print('nuovo stato: ', childState.board);

      // check if the new state is a final state
      if(agent.check_final_state(childState) != 0){

        // if is a final state compute heuristic
        heuristic = agent.heuristic(childState);
        print('Euristica: ', heuristic, 'con la mossa: ', move);
      }
      // if is not a final state continue exploring state space
      else{
        print("Devo ESPLORARE LO STATE SPACE PER VALUTARE lo stato: ", childState.board);

        var search = this.min_max_search(agent, childState);
        heuristic = search[1];

        print("Dopo un lungo viggio lo stato ", childState.board, "ha euristica: ", heuristic);
      }

      // first move is always the best move
      if (bestMove === null){
        print("La prima mossa è la miglior mossa. Mossa: ", move, "con euristica: ", heuristic);
        bestMove = move;
        bestHeuristic = heuristic;
      }

      print("----> player che valuta la mossa: ", state.player_turn);
      print("Il player è: ", this.player, "l'AI è: ", this.AI);

      // if player moves heuristic has to be MAXIMISED
      if (state.player_turn === this.player){
        if (bestHeuristic <= heuristic){
          print("Principio di MASSIMIZZAZIONE. La nuova miglior mossa è: ", bestMove, "con euristica: ", heuristic);
          bestMove = move;
          bestHeuristic = heuristic;
        }
      }
      // if AI moves heuristic has to be MINIMISED
      else{
        if (bestHeuristic >= heuristic){
          print("Principio di MINIMIZZAZIONE. La nuova miglior mossa è: ", bestMove, "con euristica: ", heuristic);

          bestMove = move;
          bestHeuristic = heuristic;
        }
      }
    });

    console.log("ritornato: ", bestMove);
    return [bestMove, bestHeuristic];
  }
}
