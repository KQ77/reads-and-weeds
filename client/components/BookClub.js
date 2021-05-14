import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchClub } from '../redux/bookclub';
import { Sidebar, Banner, SingleBook } from './index';
import '../../public/css/BookClub.css';

const _BookClub = (props) => {
  useEffect(() => {
    props.fetchClub(props.match.params.id * 1);
  }, []);
  if (props.bookclub.name) {
    const current = props.bookclub.books.find((book) => book.isCurrent);
    return (
      <div id="bookclub">
        <Banner />
        <div className="flex-container">
          <Sidebar />
          <div id="right">
            <section id="current-selection">
              <h1 className="section-heading">Current Selection</h1>
              <SingleBook book={current} />
            </section>
          </div>
        </div>
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
