import reducer from './reducer';
import { createStore, Store } from 'redux';

export const store: Store<IGame, GameAction> = createStore(reducer);
