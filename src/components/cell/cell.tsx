import * as React from 'react';

import './cell.scss';

type Props = {
  img: string;
  index: number;
  pos: number[];
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Cell: React.FC<Props> = ({ img, index, pos, onClick }) => {
  const top = pos[0] * 100 + 5;
  const left = pos[1] * 100 + 5;
  const bgLeft = (index % 4) * 100 + 5;
  const bgTop = Math.floor(index / 4) * 100 + 5;
  let classes = ['cell'];

  return (
    <div
      className={classes.join(' ')}
      onClick={onClick}
      style={{
        top,
        left,
        backgroundImage:
          `url(${img})`,
        backgroundSize: '400px 400px',
        backgroundPosition: `-${bgLeft}px -${bgTop}px`,
      }}
    />
  );
};
