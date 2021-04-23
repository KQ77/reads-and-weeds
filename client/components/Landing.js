import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import '../../public/css/Landing.css';

const _Landing = (props) => {
  return (
    <div id="landing">
      <Nav />
      <div id="hero">
        <section>{/* <img src="/images/coffeebook.jpg" /> */}</section>
      </div>
    </div>
  );
};

export const Landing = connect((state) => state)(_Landing);
