import * as React from 'react';
import { Button, Tooltip } from 'antd';

import './controls.scss';

type Props = {
  isGame: boolean;
  gamePause: () => void;
  solveTask: () => void;
  newGame: () => void;
};

export const Controls: React.FC<Props> = ({
  isGame,
  gamePause,
  solveTask,
  newGame,
}) => {
  let nameButtonOne = isGame ? 'Pause' : 'New Game';
  let functionButtonOne = isGame ? gamePause : newGame;
  let titleButtonOne = isGame ? 'Пауза' : 'Новая игра, для начала игры передвиньте фишку';
  let nameButtonTwo = 'Auto-complete';
  return (
    <div className="controls">
      <Tooltip color="blue" title={titleButtonOne}>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            functionButtonOne();
          }}
        >
          {nameButtonOne}
        </Button>
      </Tooltip>
      <Tooltip title="Автозавершение работает до начало игры" color="blue">
        <Button
          type="primary"
          size="large"
          onClick={() => {
            solveTask();
          }}
          disabled={isGame}
        >
          {nameButtonTwo}
        </Button>
      </Tooltip>
    </div>
  );
};
