import React from 'react';
import { Route } from 'react-router-dom';
import { Landing, BookClub } from './index';

const App = (props) => {
  return (
    <div id="app">
      <Route exact path="/" component={Landing} />
      <Route exact path="/bookclubs/:id" component={BookClub} />
    </div>
  );
};

export default App;
