import React from 'react';

const SingleBook = (props) => {
  const book = props.book.volumeInfo;
  return (
    <div>
      <p>{book.title} </p>
      <p>{book.subtitle}</p>
      {<img src={book.imageLinks.thumbnail}></img>}
    </div>
  );
};

export default SingleBook;