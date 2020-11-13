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

  return (
    <Tabs
      defaultActiveKey="4"
      centered
      onChange={(activeKey) => {
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
      }}
    >
      <TabPane tab="3x3" key="3">
        <GameApp />
      </TabPane>
      <TabPane tab="4x4" key="4">
        <GameApp />
      </TabPane>
      <TabPane tab="8x8" key="8">
        <GameApp />
      </TabPane>
    </Tabs>
  );
};

export default App;
