import * as React from 'react';
import './cell.scss';

type Props = {
  img: string;
  size: number;
  index: number;
  pos: number[];
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Cell: React.FC<Props> = ({ img, size, index, pos, onClick }) => {
  const sizePx = 400;
  const top = (pos[0] * sizePx) / size + 5;
  const left = (pos[1] * sizePx) / size + 5;
  const bgLeft = ((index % size) * sizePx) / size + 5;
  const bgTop = (Math.floor(index / size) * sizePx) / size + 5;
  let classes = ['cell'];

  return (
    <div
      className={classes.join(' ')}
      onClick={onClick}
      style={{
        width: `${sizePx / size - 5}px`,
        height: `${sizePx / size - 5}px`,
        top,
        left,
        backgroundImage: `url(${img})`,
        backgroundSize: `${sizePx}px ${sizePx}px`,
        backgroundPosition: `-${bgLeft}px -${bgTop}px`,
      }}
    />
  );
};
