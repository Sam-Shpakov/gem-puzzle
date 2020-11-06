import * as React from 'react';
// import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Tabs } from 'antd';

import './app.scss';

import GameApp from '../game-app';
// import AddArticle from '../component-two/';
// import { addArticle, removeArticle } from '../../redux/actions';
// import { Dispatch } from 'redux';

const App: React.FC = () => {
  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="2" centered>
      <TabPane tab="3x3" key="1">
        <GameApp size={3} />
      </TabPane>
      <TabPane tab="4x4" key="2">
        <GameApp size={4} />
      </TabPane>
      <TabPane tab="8x8" key="3">
        <GameApp size={8} />
      </TabPane>
    </Tabs>
  );
};

export default App;
