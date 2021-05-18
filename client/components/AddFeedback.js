import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Footer } from './index';
import { fetchClub } from '../redux/bookclub';

//will have access to auth.id through state or actually on backend through cookie
const _AddFeedback = (props) => {
  //this component will need access to the bookclub.books -- which will have ids and names
  useEffect(() => {
    if (!props.bookclub.books) {
      props.fetchClub(props.match.params.id * 1);
    }
  }, []);
  console.log(props, 'props in add feedback');
  const { books } = props.bookclub;
  if (!books) {
    return null;
  } else {
    return (
      <div id="add-feedback">
        <h2>Choose a book to rate/review</h2>
        {books.map((book, idx) => (
          <div key={idx}>{book.title}</div>
        ))}
        <Footer />
      </div>
    );
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchClub: (id) => dispatch(fetchClub(id)),
  };
};

export const AddFeedback = connect((state) => state, mapDispatch)(_AddFeedback);
