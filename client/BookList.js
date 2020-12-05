import React from 'react';
import '../public/BookList.css';

function BookList(props) {
  return (
    <div id="past-book-list">
      {props.books.map((book, idx) => (
        <a href={book.volumeInfo.previewLink} key={idx}>
          <img src={book.volumeInfo.imageLinks.thumbnail}></img>
        </a>
      ))}
    </div>
  );
}

export default BookList;
