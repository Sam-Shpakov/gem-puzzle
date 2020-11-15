import * as React from 'react';
import { Menu, Dropdown, Button, Modal, Table } from 'antd';
import {
  SaveOutlined,
  SoundOutlined,
  MenuOutlined,
  NotificationOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';

import './score.scss';
import { useState } from 'react';

type Props = {
  time: number;
  moves: number;
  isSound: boolean;
  isScores: boolean;
  isRules: boolean;
  scoresBest: Scores[];
  saveGame: () => void;
  openSavedGame: () => void;
  openModalScores: (isScores: boolean) => void;
  openModalRules: (isRules: boolean) => void;
  changeSound: () => void;
};

export const Score: React.FC<Props> = ({
  time,
  moves,
  isSound,
  isRules,
  isScores,
  scoresBest,
  saveGame,
  openSavedGame,
  openModalScores,
  openModalRules,
  changeSound,
}) => {
  const nameButtonOne = 'Save';
  const nameButtonTwo = isSound ? 'Sound' : 'Not sound';
  const nameButtonThree = 'Best scores';
  const nameButtonFour = 'Saved Game';
  const nameButtonFive = 'Rules';

  const iconTwo = isSound ? <SoundOutlined /> : <NotificationOutlined />;

  const isOpenModal = isRules || isScores ? true : false;
  const modalTitle = isRules ? 'Rules' : 'Best scores';

  const dataSource = scoresBest;

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      sorter: {
        compare: (a, b) => a.time - b.time,
        multiple: 1,
      },
    },
    {
      title: 'Moves',
      dataIndex: 'moves',
      sorter: {
        compare: (a, b) => a.moves - b.moves,
        multiple: 1,
      },
    },
  ];

  const modalContent = isRules ? (
    <>
      <p>
        The object of the puzzle is to place the tiles in order by making
        sliding moves that use the empty space.
      </p>
      <p>
        You can save your game and load it later. Or you can just use pause
        button. Also you can choose game field size of color in Settings
      </p>
    </>
  ) : (
    <Table dataSource={dataSource} columns={columns} />
  );

  const [visible, setVisible] = useState(false);
  const menu = (
    <>
      <Menu>
        <Menu.Item key="1" onClick={saveGame}>
          <SaveOutlined /> {nameButtonOne}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={changeSound}>
          {iconTwo}
          {nameButtonTwo}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="3"
          onClick={() => {
            openModalScores(true);
            setVisible(false);
          }}
        >
          <OrderedListOutlined />
          {nameButtonThree}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4" onClick={openSavedGame}>
          <OrderedListOutlined />
          {nameButtonFour}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="5"
          onClick={() => {
            openModalRules(true);
            setVisible(false);
          }}
        >
          <OrderedListOutlined />
          {nameButtonFive}
        </Menu.Item>
      </Menu>
      <Modal
        title={modalTitle}
        centered
        visible={isOpenModal}
        onOk={() => {
          openModalRules(false);
          openModalScores(false);
        }}
        onCancel={() => {
          openModalRules(false);
          openModalScores(false);
        }}
        width={1000}
      >
        {modalContent}
      </Modal>
    </>
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
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        onVisibleChange={(flag) => setVisible(flag)}
        visible={visible}
      >
        <Button type="primary" size="large">
          <MenuOutlined /> Menu
        </Button>
      </Dropdown>
    </div>
  );
};
