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

export function updateTime(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.UPDATE_TIME,
    payload: game,
  };

  return action;
}

export function pauseGame(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.PAUSE_GAME,
    payload: game,
  };

  return action;
}

export function changeSound(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.CHANGE_SOUND,
    payload: game,
  };

  return action;
}

export function newGame(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.NEW_GAME,
    payload: game,
  };

  return action;
}

export function openSavedGame(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.OPEN_SAVED_GAME,
    payload: game,
  };

  return action;
}

export function changeModalScores(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.CHANGE_MODAL_BEST_SCORES,
    payload: game,
  };

  return action;
}

export function changeModalRules(game: IGame): GameAction {
  const action: GameAction = {
    type: actionTypes.CHANGE_MODAL_RULES,
    payload: game,
  };

  return action;
}
