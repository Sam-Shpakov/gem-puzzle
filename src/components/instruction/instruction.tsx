import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import './instruction.scss';

type Props = {
  // article: IArticle;
  // removeArticle: (article: IArticle) => void;
};

export const Instruction: React.FC<Props> = (/*{ article, removeArticle }*/) => {
  // const dispatch: Dispatch<any> = useDispatch();

  // const deleteArticle = React.useCallback(
  //   (article: IArticle) => dispatch(removeArticle(article)),
  //   [dispatch, removeArticle]
  // );

  return (
    <div className="instruction">
      <h2>This is Instruction</h2>
    </div>
  );
};
