import * as React from 'react';
import { Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

import './score.scss';

type Props = {
  score: number;
  moves: number;
};

export const Score: React.FC<Props> = ({ score, moves }) => {

  const nameButton = 'Undo';

  return (
    <div className="score" >
      <Button type="primary" size="large">
        <UndoOutlined /> {nameButton}
      </Button>
      <div className="score-container">
        <div className="time">
          <span>time</span>
          <span className="time-container">0s</span>
        </div>
        <div className="move">
          <span>moves</span>
          <span>{moves}</span>
        </div>
      </div>
    </div>
  );
};
