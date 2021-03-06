import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];
const sagaMiddlewares = createSagaMiddleware();
middlewares.push(sagaMiddlewares);

const composer = process.env.NODE_ENV === 'development'
  ? compose(
    applyMiddleware(...middlewares),
    // console.tron.createEnhancer(),
  )
  : compose(applyMiddleware(...middlewares));

const store = createStore(reducers, composer);

sagaMiddlewares.run(sagas);

export default store;
