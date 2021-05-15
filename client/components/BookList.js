import React, { useState, useEffect } from 'react';
import '../../public/css/BookList.css';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPastBooks } from '../redux/pastBooks';

const _BookList = (props) => {
  const properties = {
    itemsToShow: 5,
    itemsToScroll: 2,
  };
  const bookIds = props.books.map((book) => book.gbId);
  useEffect(() => {
    if (props.past) {
      props.fetchPastBooks(bookIds);
    }
  }, []);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (props.pastBooks.length) {
      setBooks(props.pastBooks);
    }
  }, [props]);
  if (books.length) {
    console.log(books, 'books');
    return (
      <div id="past-book-list">
        <Carousel {...properties}>
          {books.map((book, idx) => (
            <div key={idx}>
              <img src={book.volumeInfo.imageLinks.thumbnail}></img>

              {/* <Link to={`/books/${book.id}`}>
                <img src={book.thumbnail}></img>
              </Link> */}
            </div>
          ))}
        </Carousel>
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchPastBooks: (bookIds) => dispatch(fetchPastBooks(bookIds)),
  };
};

export const BookList = connect((state) => state, mapDispatch)(_BookList);
