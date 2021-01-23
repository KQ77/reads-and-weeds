import React from 'react';
import '../public/SingleBook.css';

const SingleBook = (props) => {
  const book = props.book;
  function createDescription() {
    return { __html: props.book.description };
  }

  return (
    <section id="single-book">
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
          {<img src={book.smallImg}></img>}
          {/* <div id="book-details">
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
        </div> */}
          <div className="description">
            <p dangerouslySetInnerHTML={createDescription()} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBook;
