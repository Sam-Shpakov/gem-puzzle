import * as React from 'react';

import './game-app.scss';
import Game from '../game';
import Header from '../header';
import Instruction from '../instruction';

type Props = {
  size: number;
  board: number[][];
};

export const GameApp: React.FC<Props> = ({ size, board }) => {
  const move = () => {
    console.log('move');
  };

  return (
    <div className="game-app">
      <Header />
      <Game board={board} pos={board[0]} move={move} />
      <Instruction size={size} />
    </div>
  );
};
