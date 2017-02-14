import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { initialState, rootReducer } from './';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux';

const middlewares = [thunk, routerMiddleware(browserHistory)]

export default createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
