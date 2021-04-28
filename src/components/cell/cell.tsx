import * as React from 'react';
import './cell.scss';

type Props = {
  img: string;
  sizePx: number;
  size: number;
  index: number;
  pos: number[];
  isIndex: (index: number) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Cell: React.FC<Props> = ({
  img,
  size,
  sizePx,
  index,
  pos,
  isIndex,
  onClick,
}) => {
  const top = (pos[0] * sizePx) / size + 5;
  const left = (pos[1] * sizePx) / size + 5;
  const bgLeft = ((index % size) * sizePx) / size + 5;
  const bgTop = (Math.floor(index / size) * sizePx) / size + 5;
  let classes = ['cell'];

  const onDragOverHandler = (e) => {
    e.preventDefault();
  };
  const onDragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };
  const onDragStartHandler = (e, index) => {
    isIndex(index);
  };
  const onDragEndHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };
  const onDropHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div
      onDragOver={(e) => onDragOverHandler(e)}
      onDragLeave={(e) => onDragLeaveHandler(e)}
      onDragStart={(e) => onDragStartHandler(e, index)}
      onDragEnd={(e) => onDragEndHandler(e)}
      onDrop={(e) => onDropHandler(e)}
      draggable={true}
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
