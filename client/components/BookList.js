import React, { useState, useEffect } from 'react';
import '../../public/css/BookList.css';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBookData } from '../redux/books';

const _BookList = (props) => {
  const properties = {
    itemsToShow: 5,
    itemsToScroll: 2,
  };
  //array of all ids to pass to fetchBooks()
  // const bookIds = props.books.map((book) => book.id);
  useEffect(() => {
    props.fetchBookInfo(props.clubId);
  }, []);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (props.books.length) {
      setBooks(props.books);
    }
  }, [props]);
  if (books.length) {
    return (
      <div id="book-list">
        <Carousel {...properties}>
          {books.map((book, idx) => (
            <div key={idx}>
              <Link to={`/bookclubs/${props.bookclub.id}/books/${book.bookId}`}>
                <img src={book.volumeInfo.imageLinks.thumbnail}></img>
              </Link>
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
    fetchBookInfo: (clubId) => dispatch(fetchBookData(clubId)),
  };
};

export const BookList = connect((state) => state, mapDispatch)(_BookList);
