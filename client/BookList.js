import React from 'react';
import '../public/BookList.css';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
function BookList(props) {
  console.log(props.books, 'props.books');
  const properties = {
    itemsToShow: 5,
    itemsToScroll: 2,
  };
  return (
    <div id="past-book-list">
      <Carousel {...properties}>
        {props.books.map((book, idx) => (
          <div key={idx}>
            <Link to={`/books/${book.id}`}>
              <img src={book.thumbnail}></img>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BookList;
