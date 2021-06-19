import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBookData } from '../redux/books';
import { Card, Form } from 'react-bootstrap';
import '../../public/css/AllBooks.css';
import { Burger, Footer } from './index';

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
      props.fetchBookData(props.match.params.id, true);
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
      <>
        <Burger {...props} />
        <div id="all-books">
          <h1>Books You've Read</h1>
          {/* <Form.Control placeholder="search for a book"></Form.Control> */}
          <div>
            {books.map((book, idx) => {
              const { bookId } = book;
              book = book.volumeInfo;
              return (
                // <Card style={{ width: '7rem', margin: '2rem' }} key={idx}>
                //   <Card.Img src={book.imageLinks.thumbnail}></Card.Img>
                //   <Card.Body style={{ maxHeight: '7rem', padding: '.5rem' }}>
                //     <Card.Text>{book.title}</Card.Text>
                //   </Card.Body>
                // </Card>
                <div
                  key={idx}
                  onClick={() =>
                    props.history.push(
                      `/bookclubs/${props.match.params.id}/books/${bookId}`
                    )
                  }
                >
                  <img src={book.imageLinks.thumbnail} />
                  <p>{book.title}</p>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchBookData: (id, past) => dispatch(fetchBookData(id, past)),
  };
};

const mapState = (state) => {
  return {
    auth: state.auth,
    books: state.books.filter((book) => !book.isCurrent),
  };
};
export const AllBooks = connect(mapState, mapDispatch)(_AllBooks);
