import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFeedback } from '../redux/feedback';

const _BookFeedback = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.fetchFeedback(props.book.id);
    }
    return () => (mounted = false);
  }, []);
  const getAverage = (ratings) => {
    const _ratings = ratings.map((rating) => rating.rating);
    return _ratings.reduce((a, b) => a + b, 0);
  };
  const { comments, ratings } = props.feedback;
  if (comments) {
    return (
      <div id="book-feedback">
        <h2 style={{ fontSize: '1.2rem' }}>
          Average Member Rating:{' '}
          {ratings.length ? getAverage(ratings) : 'not yet rated by members'}
          <span style={{ fontSize: '1rem' }}>
            (based on {ratings.length} rating{ratings.length > 1 ? 's' : ''})
          </span>
        </h2>
        <div id="comments">
          {comments.length ? (
            comments.map((comment, idx) => (
              <div key={idx}>
                {comment.text} <span>- {comment.member.firstName}</span>
              </div>
            ))
          ) : (
            <div>{`<members have not yet reviewed this book>`}</div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchFeedback: (bookId) => dispatch(fetchFeedback(bookId)),
  };
};
export const BookFeedback = connect(
  (state) => state,
  mapDispatch
)(_BookFeedback);
