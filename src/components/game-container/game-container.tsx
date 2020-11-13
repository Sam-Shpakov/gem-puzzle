import * as React from 'react';

import './game-container.scss';
import Cell from '../cell';

type Props = {
  board: number[][];
  size: number;
  pos: number[];
  move: (index: number) => void;
};

export const GameContainer: React.FC<Props> = ({ board, size, pos, move }) => {
  const img =
    'https://raw.githubusercontent.com/irinainina/image-data/master/box/1.jpg';
  return (
    <div className="game-container">
      {board.slice(0, -1).map((pos, index) => (
        <Cell
          img={img}
          index={index}
          size={size}
          pos={pos}
          onClick={() => {
            move(index);
          }}
          key={index}
        />
      ))}
    </div>
  );
};
