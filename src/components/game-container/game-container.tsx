import * as React from 'react';

import './game-container.scss';
import Cell from '../cell';

type Props = {
  board: number[][];
  pos: number[];
  move: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const GameContainer: React.FC<Props> = ({ board, pos, move }) => {
  const img =
    'https://raw.githubusercontent.com/irinainina/image-data/master/box/100.jpg';
  return (
    <div className="game-container">
      {board.slice(0, -1).map((pos, index) => (
        <Cell img={img} index={index} pos={pos} onClick={move} key={index} />
      ))}
    </div>
  );
};
