import * as React from 'react';
import { Button } from 'antd';

import './controls.scss';

type Props = {
  isGame: boolean;
};

export const Controls: React.FC<Props> = ({ isGame }) => {

  let nameButtonOne = isGame ? 'Pause' : 'Start';
  let nameButtonTwo = 'New Game';
  return (
    <div className="controls">
      <Button type="primary" size="large">
        {nameButtonOne}
      </Button>
      <Button type="primary" size="large">
        {nameButtonTwo}
      </Button>
    </div>
  );
};
