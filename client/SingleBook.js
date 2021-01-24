import React from 'react';
import '../public/SingleBook.css';
import Comments from './Comments';

const SingleBook = (props) => {
  const { id } = props;
  const book = props.books.find((book) => book.id === id);
  console.log(book, 'singlebook');
  function createDescription() {
    return { __html: book.description };
  }

  return (
    <div id="single-book">
      {book.isCurrent ? <h1>Current Selection</h1> : ''}
      <div id="book-img-details">
        <div id="book-details">
          <p>
            <span>Title: </span>
            {book.title}
          </p>
          <p>
            <span>Author: </span>
            {book.author}
          </p>
          <p>
            <span>Year: </span>
            {book.year}
          </p>
          <p>
            <span>Pages: </span>
            {book.pages}
          </p>
          <p>
            <span>Genre: </span>
            {book.genre}
          </p>
        </div>
        <div className="row">
          {
            <img
              className={book.isCurrent ? 'current' : 'single-book'}
              src={book.smallImg}
            ></img>
          }

          <div className="description">
            <p dangerouslySetInnerHTML={createDescription()} />
          </div>
        </div>
      </div>
      <Comments book={book} />
    </div>
  );
};

export default SingleBook;
