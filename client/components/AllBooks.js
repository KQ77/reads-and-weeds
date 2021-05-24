import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBookData } from '../redux/books';
import { Card, Form } from 'react-bootstrap';

//url: /bookclubs/:id/books
const _AllBooks = (props) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    let mounted = true;
    // const fetchBooks = async () => {
    //   const books = (await props.fetchBookData(props.match.params.id * 1))
    //   setBooks(books);
    // };
    if (mounted) {
      // set books in state by fetching all books with this club id
      props.fetchBookData(props.match.params.id);
    }
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    if (props.books.length) {
      setBooks(props.books);
    }
  }, [props.books]);
  if (books.length) {
    return (
      <div id="all-books">
        <h1>Books We've Read</h1>
        <Form.Control placeholder="search for a book"></Form.Control>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {books.map((book, idx) => {
            book = book.volumeInfo;
            return (
              <Card style={{ width: '7rem', margin: '2rem' }} key={idx}>
                <Card.Img
                  style={{ maxHeight: '10.5rem' }}
                  src={book.imageLinks.thumbnail}
                ></Card.Img>
                <Card.Body style={{ maxHeight: '7rem', padding: '.5rem' }}>
                  <Card.Text>{book.title}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchBookData: (id) => dispatch(fetchBookData(id)),
  };
};

const mapState = (state) => {
  return {
    books: state.books.filter((book) => !book.isCurrent),
  };
};
export const AllBooks = connect(mapState, mapDispatch)(_AllBooks);
