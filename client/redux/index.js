import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allClubsReducer } from './clubs';
import { auth } from './auth';
import { memberClubsReducer } from './memberClubs';
import { bookclubReducer } from './bookclub';
import { singleBookReducer } from './singleBook';

const reducer = combineReducers({
  allClubs: allClubsReducer,
  auth,
  memberClubs: memberClubsReducer,
  bookclub: bookclubReducer,
  singleBook: singleBookReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
export const store = createStore(reducer, middleware);
