import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import './game.scss';

type Props = {
  // article: IArticle;
  // removeArticle: (article: IArticle) => void;
};

export const Game: React.FC<Props> = (/*{ article, removeArticle }*/) => {
  // const dispatch: Dispatch<any> = useDispatch();

  // const deleteArticle = React.useCallback(
  //   (article: IArticle) => dispatch(removeArticle(article)),
  //   [dispatch, removeArticle]
  // );

  return (
    <div className="game">
      <h2>This game</h2>
    </div>
  );
};
