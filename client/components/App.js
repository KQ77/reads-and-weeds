import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Landing,
  BookClub,
  SuggestionSearch,
  SingleMember,
  SingleBook,
  AddFeedback,
  EditProfile,
  AllBooks,
  AllPhotos,
  AllClubs,
  ClubRequests,
  CreateClub,
} from './index';
import { connect } from 'react-redux';
import { setAuth } from '../redux/auth';

const _App = (props) => {
  useEffect(() => {
    props.setAuth();
  }, []);
  return (
    <div id="app">
      <Route exact path="/" component={Landing} />
      <Route exact path="/bookclubs/:id" component={BookClub} />
      <Route
        path="/bookclubs/:id/suggestions/search"
        component={SuggestionSearch}
      />
      <Route exact path="/members/:id" component={SingleMember} />
      <Route path="/bookclubs/:id/books/:bookId" component={SingleBook} />
      <Route path="/bookclubs/:id/feedback/add" component={AddFeedback} />
      <Route path="/members/:id/profile/edit" component={EditProfile} />
      <Route path="/bookclubs/:id/books" component={AllBooks} />
      <Route path="/bookclubs/:id/photos" component={AllPhotos} />
      <Route path="/bookclubs/:id/requests" component={ClubRequests} />
      <Route path="/create" component={CreateClub} />
      <Route path="/explore" component={AllClubs} />
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const App = connect((state) => state, mapDispatch)(_App);
