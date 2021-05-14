import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Banner } from './Banner';
import { fetchClub } from '../redux/bookclub';

const _BookClub = (props) => {
  useEffect(() => {
    //once component mounts, fetch club and set in redux state -then its images and members will be available
    props.fetchClub(props.match.params.id * 1);
  }, []);
  return (
    <div id="bookclub">
      <Banner />
    </div>
  );
};
const mapDispatch = (dispatch) => {
  return {
    fetchClub: (clubId) => dispatch(fetchClub(clubId)),
  };
};

export const BookClub = connect((state) => state, mapDispatch)(_BookClub);
