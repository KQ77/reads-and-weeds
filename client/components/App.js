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
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/bookclubs/:id" component={BookClub} />
      </Switch>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const App = connect((state) => state, mapDispatch)(_App);
