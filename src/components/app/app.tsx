import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import { Dispatch } from 'redux';

import './app.scss';

import GameApp from '../game-app';
import { getNewBoard, shuffle } from '../../utils';
import { changeSize } from '../../redux';

const App: React.FC = () => {
  const { TabPane } = Tabs;

  const game: IGame = useSelector((state: IGame) => state, shallowEqual);

  const dispatch: Dispatch = useDispatch();

  const changeGame = React.useCallback(
    (game: IGame) => dispatch(changeSize(game)),
    [dispatch]
  );

  const changeGameSize = (activeKey: number) => {
    const buf = shuffle(
      getNewBoard(+activeKey, +activeKey),
      +activeKey * +activeKey - 1,
      +activeKey * +activeKey
    );
    changeGame({
      ...game,
      size: +activeKey,
      boardState: buf.boardAfterMove,
      solutionPath: buf.solutionPath,
    });
  };
  return (
    <>
      <Tabs
        defaultActiveKey="4"
        centered
        onChange={(activeKey) => changeGameSize(+activeKey)}
      >
        <TabPane tab="3x3" key="3"></TabPane>
        <TabPane tab="4x4" key="4"></TabPane>
        <TabPane tab="5x5" key="5"></TabPane>
        <TabPane tab="6x6" key="6"></TabPane>
        <TabPane tab="7x7" key="7"></TabPane>
        <TabPane tab="8x8" key="8"></TabPane>
      </Tabs>
      <GameApp />;
    </>
  );
};

export default App;
