import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Landing, BookClub } from './index';

const App = (props) => {
  return (
    <div id="app">
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/bookclubs/:id" component={BookClub} />
      </Switch>
    </div>
  );
};

export default App;
