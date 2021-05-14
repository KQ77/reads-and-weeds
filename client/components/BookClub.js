import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchClub } from '../redux/bookclub';
import { Sidebar, Banner } from './index';

const _BookClub = (props) => {
  useEffect(() => {
    props.fetchClub(props.match.params.id * 1);
  }, []);
  if (props.bookclub.name) {
    console.log(props.bookclub, 'props.bookclub');
    return (
      <div id="bookclub">
        <Banner />
        <Sidebar />
      </div>
    );
  } else {
    return null;
  }
};
const mapDispatch = (dispatch) => {
  return {
    fetchClub: (clubId) => dispatch(fetchClub(clubId)),
  };
};

export const BookClub = connect((state) => state, mapDispatch)(_BookClub);
