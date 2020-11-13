import { actionTypes } from '../actions';
import { getNewBoard, shuffle } from '../../utils';

const buf = shuffle(getNewBoard(4, 4), 15, 16);
export const initialState: IGame = {
  moves: 0,
  size: 4,
  shuffling: false,
  timeGame: ' ',
  boardState: buf.boardAfterMove,
  solutionPath: buf.solutionPath,
  solvedBoard: getNewBoard(4, 4),
};

const reducer = (state: IGame = initialState, action: GameAction): IGame => {
  switch (action.type) {
    case actionTypes.ADD_MOVES:
      return {
        ...state,
        moves: action.payload.moves,
        boardState: action.payload.boardState,
      };
    case actionTypes.SOLVE_PUZZLE:
      return {
        ...state,
        moves: action.payload.moves,
        boardState: action.payload.boardState,
      };
    case actionTypes.CHANGE_SIZE:
      return {
        ...state,
        moves: 0,
        size: action.payload.size,
        boardState: action.payload.boardState,
        solutionPath: action.payload.solutionPath,
        solvedBoard: getNewBoard(action.payload.size, action.payload.size),
      };
  }
  return state;
};

export default reducer;
