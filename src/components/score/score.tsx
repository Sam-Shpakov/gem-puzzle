import * as React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import {
  SaveOutlined,
  MenuOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';

import './score.scss';

type Props = {
  time: number;
  moves: number;
  saveGame: () => void;
  openBestScores: () => void;
};

export const Score: React.FC<Props> = ({
  time,
  moves,
  saveGame,
  openBestScores,
}) => {
  const nameButtonOne = 'Save';
  const nameButtonTwo = 'Best scores';
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={saveGame}>
        <SaveOutlined /> {nameButtonOne}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={openBestScores}>
        <OrderedListOutlined />
        {nameButtonTwo}
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="score">
      <div className="score-container">
        <div className="time">
          <span>time</span>
          <span className="time-container">{time}s</span>
        </div>
        <div className="move">
          <span>moves</span>
          <span>{moves}</span>
        </div>
      </div>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button type="primary" size="large">
          <MenuOutlined /> Menu
        </Button>
      </Dropdown>
    </div>
  );
};
