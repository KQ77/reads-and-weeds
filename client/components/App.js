import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Landing, BookClub } from './index';
import { connect } from 'react-redux';

const _App = (props) => {
  useEffect(() => {}, []);
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
  return {};
};
export const App = connect((state) => state)(_App);
