import * as React from 'react';

import './timer.scss';
type Props = {
  time: number;
};

export const Timer: React.FC<Props> = ({ time }) => {
  return (
    <div className="time">
      <span>time</span>
      <span className="time-container">
        {Math.floor(time / 600)}
        {Math.floor(time / 60)}:{Math.floor((time / 10) % 6)}
        {Math.floor(time % 10)}
      </span>
    </div>
  );
};
