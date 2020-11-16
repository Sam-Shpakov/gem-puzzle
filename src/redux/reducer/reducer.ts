import { actionTypes } from '../actions';
import { getNewBoard, randomNumber, shuffle } from '../../utils';

const buf = shuffle(getNewBoard(4, 4), 15, 16);

export const initialState: IGame = {
  img: `https://raw.githubusercontent.com/irinainina/image-data/master/box/${randomNumber(
    1,
    120
  )}.jpg`,
  moves: 0,
  movesSolution: 0,
  size: 4,
  shuffling: false,
  timeGame: 0,
  isSound: false,
  isGame: false,
  isRules: false,
  isScores: false,
  isSolution: false,
  boardState: buf.boardAfterMove,
  solutionPath: buf.solutionPath,
  solvedBoard: getNewBoard(4, 4),
  scoresBest: [] as Scores[],
};

const reducer = (state: IGame = initialState, action: GameAction): IGame => {
  switch (action.type) {
    case actionTypes.ADD_MOVES:
      return {
        ...state,
        isGame: action.payload.isGame,
        moves: action.payload.moves,
        movesSolution: action.payload.movesSolution,
        boardState: action.payload.boardState,
        solutionPath: action.payload.solutionPath,
      };
    case actionTypes.SOLVE_PUZZLE:
      return {
        ...state,
        isGame: true,
        moves: action.payload.moves + 1,
        timeGame: action.payload.timeGame,
        boardState: action.payload.boardState,
        isSolution: action.payload.isSolution,
      };
    case actionTypes.UPDATE_TIME:
      return {
        ...state,
        timeGame: action.payload.timeGame,
      };
    case actionTypes.CHANGE_SOUND:
      return {
        ...state,
        isSound: !action.payload.isSound,
      };
    case actionTypes.OPEN_SAVED_GAME:
      return {
        ...action.payload,
        isGame: false,
      };
    case actionTypes.PAUSE_GAME:
      return {
        ...state,
        isGame: false,
      };
    case actionTypes.CHANGE_MODAL_BEST_SCORES:
      return {
        ...state,
        isScores: action.payload.isScores,
        scoresBest: action.payload.scoresBest,
      };

    case actionTypes.CHANGE_MODAL_RULES:
      return {
        ...state,
        isRules: action.payload.isRules,
      };

    case actionTypes.NEW_GAME:
      const buf = shuffle(
        getNewBoard(action.payload.size, action.payload.size),
        action.payload.size * action.payload.size - 1,
        action.payload.size * action.payload.size
      );
      return {
        ...state,
        img: `https://raw.githubusercontent.com/irinainina/image-data/master/box/${randomNumber(
          1,
          120
        )}.jpg`,
        timeGame: 0,
        moves: 0,
        movesSolution: 0,
        isGame: false,
        isSolution: false,
        boardState: buf.boardAfterMove,
        solutionPath: buf.solutionPath,
        solvedBoard: getNewBoard(action.payload.size, action.payload.size),
      };
    case actionTypes.CHANGE_SIZE:
      return {
        ...state,
        moves: 0,
        timeGame: 0,
        isGame: false,
        size: action.payload.size,
        boardState: action.payload.boardState,
        isSolution: false,
        solutionPath: action.payload.solutionPath,
        solvedBoard: getNewBoard(action.payload.size, action.payload.size),
      };
  }
  return state;
};

export default reducer;
