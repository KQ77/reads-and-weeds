import axios from 'axios';

const SET_CLUB = 'SET_CLUB';

const setClub = (club) => ({ type: SET_CLUB, club });

export const fetchClub = (clubId) => {
  return async (dispatch) => {
    const club = (await axios.get(`/api/clubs/${clubId}`)).data;
    console.log(club, 'club');
    dispatch(setClub(club));
  };
};

export const bookclubReducer = (state = {}, action) => {
  if (action.type === SET_CLUB) {
    return action.club;
  }
  return state;
};
