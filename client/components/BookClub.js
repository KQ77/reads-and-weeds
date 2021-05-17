import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClub } from '../redux/bookclub';
import {
  Sidebar,
  Banner,
  SingleBook,
  BookList,
  Suggestions,
  BookFeedback,
} from './index';
import '../../public/css/BookClub.css';
import { Button } from 'react-bootstrap';

const _BookClub = (props) => {
  useEffect(() => {
    props.fetchClub(props.match.params.id * 1);
  }, []);
  if (props.bookclub.name) {
    const current = props.bookclub.books.find((book) => book.isCurrent);
    const pastBooks = props.bookclub.books.filter((book) => !book.isCurrent);
    return (
      <div id="bookclub">
        <Banner />
        <div className="flex-container">
          <Sidebar />
          <div id="right">
            <section id="current-selection">
              <h1 className="section-heading">Current Selection</h1>
              <SingleBook book={current} />
              <h2>What Our Members Think</h2>
              <BookFeedback book={current} />
            </section>
            <section id="suggestions">
              <div className="flex-row">
                <h1 className="section-heading">Suggestions</h1>
                <Link to={`/bookclubs/${props.bookclub.id}/suggestions/search`}>
                  <Button variant="info">+ add a book</Button>
                </Link>
              </div>
              {/* <Suggestions /> */}
            </section>
            {/* <section id="past-selections">
              <h1 className="section-heading">Past Selections</h1>
              <BookList past={true} books={pastBooks} />
            </section> */}
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
