import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allClubsReducer } from './clubs';
import { auth } from './auth';

const reducer = combineReducers({ bookclubs: allClubsReducer, auth });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
export const store = createStore(reducer, middleware);
