import React, { useState, useEffect } from 'react';
import '../../public/css/SingleBook.css';
import Comments from './Comments';
import { connect } from 'react-redux';
import { fetchGoogleBook } from '../redux/singleBook';

const _SingleBook = (props) => {
  const bookId = props.book.gbId;
  function createDescription(book) {
    return { __html: book.description };
  }
  useEffect(() => {
    //fetch book info from google books api (first hitting our api)
    props.fetchBook(bookId);
  }, []);
  console.log(props, 'props of single book');
  if (props.singleBook.id) {
    const book = props.singleBook.volumeInfo;
    return (
      <div id="single-book">
        <div id="book-img-details">
          <div id="book-details">
            <p>
              <span>Title: </span>
              {book.title}
            </p>
            <p>
              <span>Author: </span>
              {book.authors[0]}
            </p>
            <p>
              <span>Year: </span>
              {book.publishedDate.slice(0, 4)}
            </p>
            <p>
              <span>Pages: </span>
              {book.printedPageCount}
            </p>
            <p>
              <span>Genre: </span>
              {book.categories[0]}
            </p>
          </div>
          <div className="row ">
            {
              <img
                className={props.book.isCurrent ? 'current' : 'single-book'}
                src={book.imageLinks.smallThumbnail}
              ></img>
            }

            <div className="description">
              <p dangerouslySetInnerHTML={createDescription(book)} />
            </div>
          </div>
        </div>
        {/* <Comments book={book} /> */}
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchBook: (bookId) => dispatch(fetchGoogleBook(bookId)),
  };
};
export const SingleBook = connect((state) => state, mapDispatch)(_SingleBook);
