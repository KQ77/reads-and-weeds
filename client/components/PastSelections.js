import React from 'react';
import { BookList } from './BookList';

export const PastSelections = (props) => {
  return (
    <section id="past-selections">
      <h1>Past Selections</h1>
      <BookList books={props.books} />
    </section>
  );
};
