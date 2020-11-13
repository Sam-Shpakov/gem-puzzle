import { getNewBoard, randomNumber } from '../../utils';

export const shuffle = (
  board: number[][],
  emptyCell: number,
  numCell: number
) => {
  const moveDirections = ['up', 'down', 'left', 'right'];
  const antiMoveDirections = ['down', 'up', 'right', 'left'];
  const shuffleMovesRange = [60, 80];
  let boardAfterMove = board;
  // let shuffleMoves = randomNumber(shuffleMovesRange[0], shuffleMovesRange[1]);
  let shuffleMoves = 2;
  let solutionPath: string[] = [];
  let shuffling = true;
  while (shuffleMoves > 0) {
    const buf = randomNumber(0, 3);
    const bufBoardAfterMove = moveInDirection(
      moveDirections[buf],
      boardAfterMove,
      emptyCell,
      numCell,
      shuffling
    ).boardAfterMove;
    if (!isSolved(bufBoardAfterMove, boardAfterMove, numCell)) {
      solutionPath.push(antiMoveDirections[buf]);
      boardAfterMove = bufBoardAfterMove;
      shuffleMoves--;
    }
  }
  shuffling = false;
  solutionPath = solutionPath.reverse();
  return { boardAfterMove, solutionPath };
};

export const solvePath = (
  solutionPath: string[],
  board: number[][],
  emptyCell: number,
  numCell: number
) => {
  console.log('test');
  solutionPath.forEach((element) => {
    moveInDirection(element, board, emptyCell, numCell, false);
  });
};

export const moveInDirection = (
  dir: string,
  board: number[][],
  emptyCell: number,
  numCell: number,
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
  return moveCell(tileToMove, board, emptyCell, 0, shuffling);
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
