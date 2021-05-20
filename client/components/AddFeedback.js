import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Footer, EditFeedback } from './index';
import { fetchClub } from '../redux/bookclub';
import { setAuth } from '../redux/auth';
import '../../public/css/AddFeedback.css';
import { Button } from 'react-bootstrap';
//will have access to auth.id through state or actually on backend through cookie
const _AddFeedback = (props) => {
  //this component will need access to the bookclub.books -- which will have ids and names
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
  const [book, setBook] = useState(null);
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
      <div id="add-feedback">
        <h2>Choose a book</h2>
        <ul>
          {books.map((book, idx) => (
            <li key={idx} onClick={() => setBook(book)}>
              {/* <Link
                to={`/bookclubs${props.bookclub.id}/feedback/add/${book.id}`}
              > */}
              {book.title}

              {/* <Button>Rate</Button> */}
              {/* </Link> */}
              {/* <span>
                {' '}
                {isRated(book) ? 'rated' : <Link>add rating/review</Link>}
              </span>{' '} */}
            </li>
          ))}
        </ul>

        <EditFeedback {...props} book={book} />
        {/* <Footer /> */}
      </div>
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
