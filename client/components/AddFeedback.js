import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Footer, EditFeedback, Burger } from './index';
import { fetchClub } from '../redux/bookclub';
import { setAuth } from '../redux/auth';
import '../../public/css/AddFeedback.css';
import { Button, Form } from 'react-bootstrap';

const _AddFeedback = (props) => {
  //this component will need access to the bookclub.books -- which will have ids and names
  const [selectedId, setSelectedId] = useState(undefined);
  const toggleSelection = (id) => {
    if (selectedId === id) setSelectedId(undefined);
    else setSelectedId(id);
  };
  useEffect(() => {
    if (!props.bookclub.books) {
      props.fetchClub(props.match.params.id * 1);
    }
    if (!props.auth.id) {
      props.setAuth();
    }
  }, []);
  const isRated = (book) => {
    return book.comments.some((comment) => comment.memberId === props.auth.id);
  };
  // const [book, setBook] = useState(null);
  const handleFilter = (e) => {};
  const { books } = props.bookclub;
  if (!books || !props.auth.id) {
    return null;
  } else {
    // const ratedBooks = books.filter((book) =>
    //   book.comments.some((comment) => comment.memberId === props.auth.id)
    // );
    // const unratedBooks = books.filter((book) =>
    //   book.comments.every((comment) => comment.memberId !== props.auth.id)
    // );
    return (
      <>
        <Burger {...props} />
        <div id="add-feedback">
          <h2>Add/Edit Your Reviews</h2>
          <Form.Control
            placeholder="search for a book"
            type="text"
            onChange={(e) => handleFilter(e)}
          ></Form.Control>

          {books.map((book, idx) => (
            <div key={idx}>
              <div
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => toggleSelection(book.id)}
              >
                {/* <Link
                to={`/bookclubs${props.bookclub.id}/feedback/add/${book.id}`}
              > */}
                <span style={{ display: `${selectedId ? 'none' : 'block'}` }}>
                  {book.title}
                </span>
                {/* <Button>Rate</Button> */}
                {/* </Link> */}
                {/* <span>
                {' '}
                {isRated(book) ? 'rated' : <Link>add rating/review</Link>}
              </span>{' '} */}
              </div>
              <div
                style={{
                  display: `${selectedId === book.id ? 'block' : 'none'}`,
                }}
              >
                <EditFeedback
                  {...props}
                  setSelectedId={setSelectedId}
                  book={book}
                />
                <Button onClick={() => setSelectedId(undefined)} variant="info">
                  Close
                </Button>
              </div>
            </div>
          ))}
          {/* <Footer /> */}
        </div>
      </>
    );
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchClub: (id) => dispatch(fetchClub(id)),
    setAuth: () => dispatch(setAuth()),
  };
};

export const AddFeedback = connect((state) => state, mapDispatch)(_AddFeedback);
