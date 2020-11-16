import * as React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import './game-app.scss';
import Game from '../game';
import Header from '../header';
import Instruction from '../instruction';

export const GameApp: React.FC = () => {
  const game: IGame = useSelector((state: IGame) => state, shallowEqual);
  return (
    <div className="game-app">
      <Header />
      <Game />
      <Instruction size={game.size} />
    </div>
  );
};
