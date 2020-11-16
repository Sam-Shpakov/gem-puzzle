import * as React from 'react';
import { Menu, Dropdown, Button, Modal, Table } from 'antd';
import {
  SaveOutlined,
  SoundOutlined,
  SaveFilled,
  MenuOutlined,
  UnorderedListOutlined,
  NotificationOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';

import './score.scss';
import { useState } from 'react';
import Timer from '../timer';

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

  const dataSource = scoresBest.map((item, index) => {
    return {
      ...item,
      time: `${Math.floor((item.time + 1) / 600)}${Math.floor(
        (item.time + 1) / 60
      )}:${Math.floor(((item.time + 1) / 10) % 6)}${Math.floor(
        (item.time + 1) % 10
      )}`,
      key: index,
    };
  });

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
      <p>Для проверки статистики используете автозавершение.</p>
      <p>
        После завершении сбора пазла, для начала игры необходимо нажать новая
        игра
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
          <SaveFilled />
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
          <UnorderedListOutlined />
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
        <Timer time={time} />
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
