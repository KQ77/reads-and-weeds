import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
  InviteView,
  EditClub,
  AllClubMembers,
  Login,
  LoginForm,
  MemberClubs,
} from './index';
import { connect } from 'react-redux';
import { setAuth } from '../redux/auth';
import { fetchMemberClubs } from '../redux/memberClubs';

const _App = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    props.setAuth();
  }, []);
  useEffect(() => {
    //when app is reloaded
    if (props.auth.id) {
      props.setMemberClubs(props.auth.id);
    }
  }, [props.auth]);
  return (
    <div id="app" style={{ background: 'white' }}>
      <Route exact path="/" component={Landing} />
      <Route exact path="/bookclubs/:id" component={BookClub} />
      <Route
        path="/bookclubs/:id/suggestions/search"
        component={SuggestionSearch}
      />
      <Route
        path="/login"
        render={(props) => <LoginForm login={true} {...props} />}
      />
      <Route path="/register" render={(props) => <LoginForm {...props} />} />

      <Route exact path="/members/:id" component={SingleMember} />
      <Route path="/bookclubs/:id/books/:bookId" component={SingleBook} />
      <Route path="/bookclubs/:id/feedback/add" component={AddFeedback} />
      <Route path="/members/:id/profile/edit" component={EditProfile} />
      <Route exact path="/bookclubs/:id/books" component={AllBooks} />
      <Route path="/bookclubs/:id/photos" component={AllPhotos} />
      <Route path="/bookclubs/:id/requests" component={ClubRequests} />
      <Route path="/bookclubs/:id/edit" component={EditClub} />
      {/* <Route path="/invites/:id"> */}
      {/* <InviteView {...props} /> */}
      {/* {!props.auth.id ? <Redirect to="/login" /> : <InviteView {...props} />} */}
      {/* </Route> */}

      <Route path="/invites/:id/" component={InviteView} />
      <Route path="/bookclubs/:id/members" component={AllClubMembers} />

      <Route path="/create" component={CreateClub} />
      <Route path="/explore" component={AllClubs} />
      <Route path="/members/:id/clubs" component={MemberClubs} />
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
    setMemberClubs: (memberId) => dispatch(fetchMemberClubs(memberId)),
  };
};
export const App = connect((state) => state, mapDispatch)(_App);
