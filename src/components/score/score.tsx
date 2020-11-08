import * as React from 'react';
import { Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

import './score.scss';

type Props = {
  score: number;
};

export const Score: React.FC<Props> = ({ score }) => {

  const nameButton = 'Undo';

  return (
    <div className="score">
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
          <span>0</span>
        </div>
      </div>
    </div>
  );
};
