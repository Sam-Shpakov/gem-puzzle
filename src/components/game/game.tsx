import * as React from 'react';

import './game.scss';

import Score from '../score';
import GameContainer from '../game-container';
import Controls from '../controls';

type Props = {
  board: number[][];
  size: number;
  moves: number;
  pos: number[];
  move: (index: number) => void;
  solveTask: () => void;
};

export const Game: React.FC<Props> = ({
  board,
  moves,
  size,
  pos,
  move,
  solveTask,
}) => {
  return (
    <div className="game">
      <Score score={0} moves={moves} />
      <GameContainer board={board} size={size} pos={pos} move={move} />
      <Controls isGame={false} solveTask={solveTask}/>
    </div>
  );
};
