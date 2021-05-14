import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Landing, BookClub } from './index';
import { connect } from 'react-redux';
import { setAuth } from '../redux/auth';

const _App = (props) => {
  useEffect(() => {
    props.setAuth();
  }, []);
  return (
    <div id="app">
      <Route exact path="/" component={Landing} />
      <Route path="/bookclubs/:id" component={BookClub} />
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const App = connect((state) => state, mapDispatch)(_App);
