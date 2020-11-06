import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import './header.scss';

type Props = {
  // article: IArticle;
  // removeArticle: (article: IArticle) => void;
};

export const Header: React.FC<Props> = (/*{ article, removeArticle }*/) => {
  // const dispatch: Dispatch<any> = useDispatch();

  // const deleteArticle = React.useCallback(
  //   (article: IArticle) => dispatch(removeArticle(article)),
  //   [dispatch, removeArticle]
  // );

  return (
    <div className="header">
      <h2>This is header</h2>
    </div>
  );
};