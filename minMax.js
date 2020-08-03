class MinMax {

  // depth argument refers to the tree search max depth
  constructor(player, playerAI, depth = 1000){

    this.player = player;
    this.AI = playerAI;

    if (depth < 0) {
      console.log("Invalid depth for MinMax algorithm. Depth must be positive.\nMinMax - constructor")
      depth = 1000;
    }
    else
      this.depth = depth;

  }

  nextMove(agent){

    var move = this.min_max_search(agent, agent.state, this.depth, 0);

    return move[0];
  }

  min_max_search(agent, state, max_depth, depth){

    // all possible actions
    var fringe = agent.action(state);

    // move that will be chosen
    var bestMove = null;
    var bestHeuristic = 0;

    var bestMoves = [];

    // compute for all possible actions in the fringe list
    fringe.forEach((move, i) => {

      var heuristic;

      // compute the evolution of the state
      var childState = agent.result(state, move, state.player_turn);


      // check if the new state is a final state
      if(agent.check_final_state(childState) != 0 || depth === max_depth){

        // if is a final state compute heuristic
        heuristic = agent.heuristic(childState, depth);
      }
      // if is not a final state continue exploring state space
      else{
        var new_depth = depth + 1;
        var search = this.min_max_search(agent, childState, max_depth, new_depth);
        heuristic = search[1];
      }

      // first move is always the best move
      if (bestMove === null){

        bestMove = move;
        bestHeuristic = heuristic;
      }

      // if player moves heuristic has to be MAXIMISED
      if (state.player_turn === this.player){

        if (bestHeuristic < heuristic){
          bestMoves = [move];
          bestHeuristic = heuristic;
        }
        else if(bestHeuristic === heuristic)
          bestMoves.push(move);
      }
      // if AI moves heuristic has to be MINIMISED
      else{

        if (bestHeuristic > heuristic){
          bestMoves = [move];
          bestHeuristic = heuristic;
        }
        else if(bestHeuristic === heuristic)
          bestMoves.push(move);
      }
    });

    //print("le mosse migliori sono: ", bestMoves);
    //print("la mossa scelta è: ", bestMove);

    // choose the best move between equivalent best moves
    var bestMove_index = Math.floor(Math.random() * bestMoves.length);
    bestMove = bestMoves[bestMove_index];

    return [bestMove, bestHeuristic];
  }
}
