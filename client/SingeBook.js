import React from 'react';
import '../public/SingleBook.css';

const SingleBook = (props) => {
  const book = props.book.volumeInfo;
  console.log(book, 'singleBook');
  function createDescription() {
    return { __html: props.book.volumeInfo.description };
  }

  return (
    <div id="single-book">
      <div id="book-img-details">
        {<img src={book.imageLinks.small}></img>}
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
            {book.pageCount}
          </p>
          <p>
            <span>Genre: </span>
            {book.categories[0]}
          </p>
        </div>
      </div>

      <div className="description">
        <p dangerouslySetInnerHTML={createDescription()} />
      </div>
    </div>
  );
};

export default SingleBook;
