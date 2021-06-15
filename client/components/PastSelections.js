import React from 'react';
import { BookList } from './BookList';
import '../../public/css/PastSelections.css';

export const PastSelections = (props) => {
  return (
    <div>
      {props.books.length ? (
        <section id="past-selections">
          <h1>Past Selections</h1>
          <BookList books={props.books} />
        </section>
      ) : (
        <div id="no-past-books">
          <h2>Your group has not read any books</h2>
          <h4>
            <Link to="/explore">Explore all books</Link> to pick your next read
          </h4>
        </div>
      )}
    </div>
  );
};
