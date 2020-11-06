import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import './game-app.scss';
import Game from '../game';
import Header from '../header';
import Instruction from '../instruction';

type Props = {
  size: number;
  // removeArticle: (article: IArticle) => void;
};

export const GameApp: React.FC<Props> = ({ size }) => {
  // const dispatch: Dispatch<any> = useDispatch();

  // const deleteArticle = React.useCallback(
  //   (article: IArticle) => dispatch(removeArticle(article)),
  //   [dispatch, removeArticle]
  // );

  return (
    <div className="game-app">
      <Header />
      <Game />
      <Instruction size={size} />
    </div>
  );
};
