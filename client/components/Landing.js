import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import '../../public/Landing.css';

const _Landing = (props) => {
  return (
    <div id="landing">
      <Nav />

      <section id="hero">{/* <img src="/images/coffeebook.jpg" /> */}</section>
    </div>
  );
};

export const Landing = connect((state) => state)(_Landing);
