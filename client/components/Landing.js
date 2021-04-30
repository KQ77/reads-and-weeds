import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import '../../public/css/Landing.css';

const _Landing = (props) => {
  return (
    <div id="landing">
      <Nav />

      <section id="hero">{/* <img src="/images/coffeebook.jpg" /> */}</section>
      <section id="your-clubs">{/* <ClubList clubs={clubs} /> */}</section>
    </div>
  );
};

//setAuth if someone signed in still
//once component mounts & auth is set - fetch user's bookclubs
//how to auth? JWT? firebase?
const mapState = (state, routeProps) => {};
export const Landing = connect((state) => state)(_Landing);
