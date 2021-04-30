import React from 'react';
import '../../public/BookList.css';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

export function BookList(props) {
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
