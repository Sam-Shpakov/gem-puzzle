import * as React from 'react';

import './game.scss';

import Score from '../score';
import GameContainer from '../game-container';
import Controls from '../controls';

type Props = {
  board: number[][];
  pos: number[];
  move: () => void;
};

export const Game: React.FC<Props> = ({ board, pos, move }) => {
  return (
    <div className="game">
      <Score score={0} />
      <GameContainer board={board} pos={pos} move={move} />
      <Controls isGame={false} />
    </div>
  );
};
