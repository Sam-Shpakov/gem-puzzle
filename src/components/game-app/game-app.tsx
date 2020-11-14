import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import './game-app.scss';
import Game from '../game';
import Header from '../header';
import Instruction from '../instruction';
import { addMoves, solvePuzzle } from '../../redux';
import { moveCell, moveInDirection } from '../../utils';

export const GameApp: React.FC = () => {
  const game: IGame = useSelector((state: IGame) => state, shallowEqual);
  const dispatch: Dispatch = useDispatch();
  const emptyCell = game.size * game.size - 1;
  const changeGameState = React.useCallback(
    (game: IGame) => dispatch(addMoves(game)),
    [dispatch]
  );

  const solvePuzzleTask = React.useCallback(
    (game: IGame) => dispatch(solvePuzzle(game)),
    [dispatch]
  );

  useEffect(() => {
    console.log('useEffect');
    if (game.isSolution && game.moves < game.solutionPath.length) {
      const buf = moveInDirection(
        game.solutionPath[game.moves],
        game.boardState,
        emptyCell,
        emptyCell + 1,
        game.moves,
        false
      );

      setTimeout(() => {
        changeGameState({
          ...game,
          boardState: buf.boardAfterMove,
          moves: buf.moves,
        });
      }, 150);
    } else if (game.isSolution) {
      changeGameState({
        ...game,
        isSolution: false,
      });
    }
  });

  const solveTask = () => {
    solvePuzzleTask({
      ...game,
      isSolution: true,
    });
  };

  const move = (index: number) => {
    const buf = moveCell(index, game.boardState, emptyCell, game.moves, false);
    if (buf.moves !== game.moves) {
      changeGameState({
        ...game,
        boardState: buf.boardAfterMove,
        moves: buf.moves,
      });
    }
  };

  return (
    <div className="game-app">
      <Header />
      <Game
        board={game.boardState}
        size={game.size}
        moves={game.moves}
        pos={game.boardState[0]}
        move={move}
        solveTask={solveTask}
      />
      <Instruction size={game.size} />
    </div>
  );
};
