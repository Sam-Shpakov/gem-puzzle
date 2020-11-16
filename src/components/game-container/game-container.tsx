import * as React from 'react';
import { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import './game-container.scss';
import Cell from '../cell';

type Props = {
  board: number[][];
  isSolution: boolean;
  size: number;
  move: (index: number) => void;
};

export const GameContainer: React.FC<Props> = ({
  board,
  isSolution,
  size,
  move,
}) => {
  const game: IGame = useSelector((state: IGame) => state, shallowEqual);
  const initSizePx = window.innerWidth > 415 ? 400 : 300;
  const [sizePx, setSizePx] = useState(initSizePx);
  window.addEventListener('resize', () => {
    window.innerWidth > 415 ? setSizePx(400) : setSizePx(300);
  });
  let classes = isSolution
    ? ['game-container', 'disabled-game']
    : ['game-container'];
  return (
    <div className={classes.join(' ')}>
      {board.slice(0, -1).map((pos, index) => (
        <Cell
          img={game.img}
          index={index}
          size={size}
          sizePx={sizePx}
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
