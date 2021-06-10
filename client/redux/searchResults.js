import axios from 'axios';
import { async } from 'regenerator-runtime';

const SET_RESULTS = 'SET_RESULTS';

const setResults = (results) => ({ type: SET_RESULTS, results });

//will have a search term -- take this term and send request to our DB to search for clubs and return a list/array - set that in state as searchResults
export const fetchResults = (searchTerm) => {
  return async (dispatch) => {
    const results = (await axios.post('/api/search/clubs', { searchTerm }))
      .data;
    dispatch(setResults(results));
  };
};

export const clubSearchResultsReducer = (state = [], action) => {
  if (action.type === SET_RESULTS) return action.results;
  return state;
};
