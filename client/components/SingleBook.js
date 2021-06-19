import React, { useEffect } from 'react';
import '../../public/css/SingleBook.css';
import { connect } from 'react-redux';
import { fetchBook } from '../redux/singleBook';
import { BookFeedback, Footer, Burger } from './index';

const _SingleBook = (props) => {
  const bookId = props.bookId || props.match.params.bookId;
  console.log(bookId, 'bookId');
  function createDescription(book) {
    return { __html: book.description };
  }
  useEffect(() => {
    //bookId here is a sequelize ID
    props.fetchBook(bookId);
  }, [props.bookclub.id]);
  if (props.singleBook.id) {
    //getting the info from redux state..
    const book = props.singleBook.volumeInfo;
    return (
      <>
        <div id="single-book">
          <Burger {...props} />
          <div id="book-details">
            <p>
              <span>Title: </span>
              {book.title}
            </p>
            <p>
              <span>Author: </span>
              {book.authors ? book.authors[0] : ''}
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
                className={props.landing ? 'landing' : 'single-book'}
                src={book.imageLinks.smallThumbnail}
              ></img>
            }
            <div className="description">
              <p dangerouslySetInnerHTML={createDescription(book)} />
            </div>
          </div>
        </div>
        <BookFeedback {...props} bookId={bookId} />

        {props.clubView ? '' : <Footer />}
      </>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchBook: (bookId) => dispatch(fetchBook(bookId)),
  };
};
export const SingleBook = connect((state) => state, mapDispatch)(_SingleBook);
