import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { message, Modal } from 'antd';

import './game.scss';
import Score from '../score';
import GameContainer from '../game-container';
import Controls from '../controls';
import {
  addMoves,
  changeModalRules,
  changeModalScores,
  changeSound,
  newGame,
  openSavedGame,
  pauseGame,
  solvePuzzle,
  updateTime,
} from '../../redux';
import {
  moveCell,
  isSolved,
  moveInDirection,
  updateSolutionPath,
} from '../../utils';

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

  const soundChange = React.useCallback(
    (game: IGame) => dispatch(changeSound(game)),
    [dispatch]
  );

  const openGame = React.useCallback(
    (game: IGame) => dispatch(openSavedGame(game)),
    [dispatch]
  );

  const changeScores = React.useCallback(
    (game: IGame) => dispatch(changeModalScores(game)),
    [dispatch]
  );

  const changeRules = React.useCallback(
    (game: IGame) => dispatch(changeModalRules(game)),
    [dispatch]
  );

  useEffect(() => {
    if (game.isGame) {
      const interval = setInterval(() => {
        updateTimeGame({
          ...game,
          timeGame: game.timeGame + 1,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [game.timeGame]);

  useEffect(() => {
    if (game.isSolution && game.movesSolution < game.solutionPath.length) {
      const buf = moveInDirection(
        game.solutionPath[game.movesSolution],
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
          movesSolution: game.movesSolution + 1,
        });
      }, 200);
    } else if (game.isSolution) {
      changeGameState({
        ...game,
        isSolution: false,
      });
      isFinishedGame();
    }
  }, [game.moves]);

  const solveTask = () => {
    solvePuzzleTask({
      ...game,
      isSolution: true,
      timeGame: 1,
    });
  };

  const move = (index: number) => {
    const buf = moveCell(index, game.boardState, emptyCell, game.moves, false);
    if (buf.moves !== game.moves) {
      const bufPath = updateSolutionPath(
        index,
        game.solutionPath,
        game.boardState,
        emptyCell,
        emptyCell + 1
      );
      if (!game.isGame) {
        changeGameState({
          ...game,
          boardState: buf.boardAfterMove,
          moves: buf.moves,
          solutionPath: bufPath,
          isGame: true,
        });
        updateTimeGame({
          ...game,
          timeGame: game.timeGame + 1,
        });
      } else {
        changeGameState({
          ...game,
          boardState: buf.boardAfterMove,
          moves: buf.moves,
        });
      }
      isFinishedGame();
      if (game.isSound) {
        let audio = new Audio(
          'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/boom.wav'
        );
        audio.play();
      }
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

  const isFinishedGame = () => {
    if (isSolved(game.boardState, game.solvedBoard, game.boardState.length)) {
      pause({
        ...game,
        isGame: false,
      });
      Modal.success({
        content: `Ура! Вы решили головоломку за ${Math.floor(
          (game.timeGame + 1) / 600
        )}${Math.floor((game.timeGame + 1) / 60)}:${Math.floor(
          ((game.timeGame + 1) / 10) % 6
        )}${Math.floor((game.timeGame + 1) % 10)} и  ${game.moves} ходов`,
      });
      let oldBest = openScoresBest();
      oldBest = updateBestScores(oldBest, {
        time: game.timeGame,
        moves: game.moves,
      });
      localStorage.setItem(`scoresBest${game.size}`, JSON.stringify(oldBest));
    }
  };

  const updateBestScores = (oldBest: Scores[], newScore: Scores) => {
    if (oldBest.length < 10) {
      oldBest.push(newScore);
    } else {
      let maxOldBest = oldBest.findIndex(
        (item) => item.time + item.moves > newScore.moves + newScore.time
      );
      if (maxOldBest !== -1) {
        oldBest.splice(maxOldBest, 1, newScore);
      }
    }
    return oldBest;
  };

  const openScoresBest = () => {
    const currentGames = localStorage.getItem(`scoresBest${game.size}`);
    if (currentGames !== null) {
      let oldBest: Scores[] = JSON.parse(currentGames);
      return oldBest;
    } else {
      return [] as Scores[];
    }
  };

  const saveGame = () => {
    localStorage.setItem(`currentGame${game.size}`, JSON.stringify(game));
    message.success('Save game');
  };

  const savedGameOpen = () => {
    const currentGame = localStorage.getItem(`currentGame${game.size}`);
    if (currentGame !== null) {
      let oldGame: IGame = JSON.parse(currentGame);
      openGame({
        ...oldGame,
      });
    } else {
      message.info('Not save game');
    }
  };

  const openModalScores = (isScores: boolean) => {
    let oldBest = openScoresBest();
    changeScores({
      ...game,
      isScores: isScores,
      scoresBest: oldBest,
    });
  };

  const openModalRules = (isRules: boolean) => {
    changeRules({
      ...game,
      isRules: isRules,
    });
  };

  const isSound = () => {
    soundChange({
      ...game,
    });
  };

  return (
    <div className="game">
      <Score
        time={game.timeGame}
        moves={game.moves}
        isSound={game.isSound}
        isScores={game.isScores}
        isRules={game.isRules}
        scoresBest={game.scoresBest}
        saveGame={saveGame}
        openSavedGame={savedGameOpen}
        openModalScores={openModalScores}
        openModalRules={openModalRules}
        changeSound={isSound}
      />
      <GameContainer
        board={game.boardState}
        isSolution={game.isSolution}
        size={game.size}
        move={move}
      />
      <Controls
        isGame={game.isGame}
        isFinished={isSolved(
          game.boardState,
          game.solvedBoard,
          game.boardState.length
        )}
        gamePause={gamePause}
        solveTask={solveTask}
        newGame={gameNew}
      />
    </div>
  );
};
