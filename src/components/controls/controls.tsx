import * as React from 'react';
import { Button } from 'antd';

import './controls.scss';

type Props = {
  isGame: boolean;
  isFinished: boolean;
  gamePause: () => void;
  solveTask: () => void;
  newGame: () => void;
};

export const Controls: React.FC<Props> = ({
  isGame,
  isFinished,
  gamePause,
  solveTask,
  newGame,
}) => {
  let nameButtonOne = isGame ? 'Pause' : 'New Game';
  let functionButtonOne = isGame ? gamePause : newGame;
  let nameButtonTwo = 'Auto-complete';
  return (
    <div className="controls">
      <Button
        type="primary"
        size="large"
        onClick={() => {
          functionButtonOne();
        }}
      >
        {nameButtonOne}
      </Button>

      <Button
        type="primary"
        size="large"
        onClick={() => {
          solveTask();
        }}
        disabled={isFinished || isGame}
      >
        {nameButtonTwo}
      </Button>
    </div>
  );
};
