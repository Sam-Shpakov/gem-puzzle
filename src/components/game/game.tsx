import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import './game.scss';
import Score from '../score';
import GameContainer from '../game-container';
import Controls from '../controls';
import {
  addMoves,
  newGame,
  pauseGame,
  solvePuzzle,
  updateTime,
} from '../../redux';
import { moveCell, moveInDirection } from '../../utils';

export const Game: React.FC = () => {
  const game: IGame = useSelector((state: IGame) => state, shallowEqual);
  console.log(game);
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

  const updateTimeGame = React.useCallback(
    (game: IGame) => dispatch(updateTime(game)),
    [dispatch]
  );

  const pause = React.useCallback((game: IGame) => dispatch(pauseGame(game)), [
    dispatch,
  ]);

  const newPuzzle = React.useCallback(
    (game: IGame) => dispatch(newGame(game)),
    [dispatch]
  );

  useEffect(() => {
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

    if (game.isGame) {
      const interval = setInterval(() => {
        updateTimeGame({
          ...game,
          timeGame: game.timeGame + 1,
        });
      }, 1000);
      return () => clearInterval(interval);
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

  const gamePause = () => {
    pause({
      ...game,
      isGame: false,
    });
  };

  const gameNew = () => {
    newPuzzle({
      ...game,
      isGame: false,
    });
  };

  const saveGame = () => {
    console.log('Save');
    // localStorage.setItem('rememberMe', game.boardState);
  };

  const openBestScores = () => {
    console.log('openBestScores');
  };
  return (
    <div className="game">
      <Score
        time={game.timeGame}
        moves={game.moves}
        saveGame={saveGame}
        openBestScores={openBestScores}
      />
      <GameContainer
        board={game.boardState}
        size={game.size}
        pos={game.boardState[0]}
        move={move}
      />
      <Controls
        isGame={game.isGame}
        gamePause={gamePause}
        solveTask={solveTask}
        newGame={gameNew}
      />
    </div>
  );
};
