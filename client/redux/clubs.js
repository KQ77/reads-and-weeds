import axios from 'axios';
import { async } from 'regenerator-runtime';

//constants
const SET_CLUBS = 'SET_CLUBS';

// action creators
const _setClubs = (clubs) => ({ type: SET_CLUBS, clubs });

//thunk middleware functions
export const setClubs = () => {
  return async (dispatch) => {
    const clubs = (await axios.get('/api/bookclubs')).data;
    dispatch(_setClubs(clubs));
  };
};

//reducer for all bookclubs
export const allClubsReducer = (state = [], action) => {
  if (action.type === SET_CLUBS) {
    return action.clubs;
  }
  return state;
};
