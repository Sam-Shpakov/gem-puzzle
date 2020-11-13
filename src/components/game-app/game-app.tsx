import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import './game-app.scss';
import Game from '../game';
import Header from '../header';
import Instruction from '../instruction';
import { addMoves } from '../../redux';
import { moveCell, moveInDirection, solvePath } from '../../utils';

export const GameApp: React.FC = () => {
  const game: IGame = useSelector((state: IGame) => state, shallowEqual);
  const dispatch: Dispatch = useDispatch();
  const emptyCell = game.size * game.size - 1;
  console.log(game);
  const changeGameState = React.useCallback(
    (game: IGame) => dispatch(addMoves(game)),
    [dispatch]
  );

  const solveTask = () => {
    game.solutionPath.forEach((element) => {
      const buf = moveInDirection(
        element,
        game.boardState,
        emptyCell,
        emptyCell + 1,
        false
      );
      console.log(buf);
      changeGameState({
        ...game,
        boardState: buf.boardAfterMove,
        moves: buf.moves,
      });
      setTimeout(() => {}, 1000);
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
