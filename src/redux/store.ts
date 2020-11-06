import { createStore, applyMiddleware, Store } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

export const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));
