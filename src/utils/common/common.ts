import { getNewBoard, randomNumber } from '../../utils';

export const shuffle = (
  board: number[][],
  emptyCell: number,
  numCell: number
) => {
  const moveDirections = ['up', 'down', 'left', 'right'];
  const antiMoveDirections = ['down', 'up', 'right', 'left'];
  const shuffleMovesRange = [4 * board.length, 5 * board.length];
  let boardAfterMove = board;
  let shuffleMoves = randomNumber(shuffleMovesRange[0], shuffleMovesRange[1]);
  let solutionPath: string[] = [];
  let shuffling = true;
  while (shuffleMoves > 0) {
    const buf = randomNumber(0, 3);
    const bufBoardAfterMove = moveInDirection(
      moveDirections[buf],
      boardAfterMove,
      emptyCell,
      numCell,
      0,
      shuffling
    ).boardAfterMove;
    if (
      !isSolved(bufBoardAfterMove, boardAfterMove, numCell) &&
      (solutionPath.length === 0 ||
        solutionPath[solutionPath.length - 1] !== moveDirections[buf])
    ) {
      solutionPath.push(antiMoveDirections[buf]);
      boardAfterMove = bufBoardAfterMove;
      shuffleMoves--;
    }
  }
  shuffling = false;
  solutionPath = solutionPath.reverse();
  return { boardAfterMove, solutionPath };
};

export const updateSolutionPath = (
  index: number,
  solutionPath: string[],
  board: number[][],
  emptyCell: number,
  numCell: number
) => {
  const epos = board[emptyCell];
  const moveCell = board[index];
  let dir = '';
  if (moveCell[0] - epos[0] === 0) {
    dir = moveCell[1] - epos[1] > 0 ? 'right' : 'left';
  } else {
    dir = moveCell[0] - epos[0] > 0 ? 'down' : 'up';
  }
  solutionPath.unshift(dir);
  return solutionPath;
};

export const moveInDirection = (
  dir: string,
  board: number[][],
  emptyCell: number,
  numCell: number,
  moves: number,
  shuffling: boolean
) => {
  const epos = board[emptyCell];
  const posToMove =
    dir === 'up'
      ? [epos[0] + 1, epos[1]]
      : dir === 'down'
      ? [epos[0] - 1, epos[1]]
      : dir === 'left'
      ? [epos[0], epos[1] + 1]
      : dir === 'right'
      ? [epos[0], epos[1] - 1]
      : epos;
  let tileToMove = numCell;
  for (let i = 0; i < numCell; i++) {
    if (board[i][0] === posToMove[0] && board[i][1] === posToMove[1]) {
      tileToMove = i;
      break;
    }
  }
  return moveCell(tileToMove, board, emptyCell, moves, shuffling);
};

export const isSolved = (
  board: number[][],
  solvedBoard: number[][],
  numCell: number
) => {
  for (let i = 0; i < numCell; i++) {
    if (board[i][0] !== solvedBoard[i][0] || board[i][1] !== solvedBoard[i][1])
      return false;
  }
  return true;
};

export const canMoveСell = (
  index: number,
  board: number[][],
  emptyCell: number,
  numCell: number
) => {
  if (index < 0 || index >= numCell) return false;
  const tilePos = board[index];
  const emptyPos = board[emptyCell];
  if (tilePos[0] === emptyPos[0])
    return Math.abs(tilePos[1] - emptyPos[1]) === 1;
  else if (tilePos[1] === emptyPos[1])
    return Math.abs(tilePos[0] - emptyPos[0]) === 1;
  else return false;
};

export const moveCell = (
  index: number,
  board: number[][],
  emptyCell: number,
  moves: number,
  shuffling: boolean
) => {
  let boardAfterMove = [...board];
  if (
    isSolved(
      boardAfterMove,
      getNewBoard(Math.sqrt(emptyCell + 1), Math.sqrt(emptyCell + 1)),
      emptyCell + 1
    ) &&
    !shuffling
  )
    return { boardAfterMove, moves };
  if (!canMoveСell(index, board, emptyCell, emptyCell + 1))
    return { boardAfterMove, moves };
  const emptyPosition = [...board[emptyCell]];
  const tilePosition = [...board[index]];
  boardAfterMove[emptyCell] = tilePosition;
  boardAfterMove[index] = emptyPosition;
  moves = moves + 1;
  return { boardAfterMove, moves };
};
