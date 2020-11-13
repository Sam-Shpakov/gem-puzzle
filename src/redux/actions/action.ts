import * as actionTypes from './actionTypes';

export function addMoves(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.ADD_MOVES,
    payload: game,
  };

  return action;
}

export function changeSize(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.CHANGE_SIZE,
    payload: game,
  };

  return action;
}

export function solvePuzzle(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.SOLVE_PUZZLE,
    payload: game,
  };

  return action;
}
