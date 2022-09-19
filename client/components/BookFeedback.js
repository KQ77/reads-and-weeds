import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../public/css/BookFeedback.css';
import axios from 'axios';

const _BookFeedback = (props) => {
  const [reviews, setReviews] = useState([]);
  const getReviews = async () => {
    const reviews = (await axios.get(`/api/books/${props.bookId}/reviews`))
      .data;
    setReviews(reviews);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getReviews();
    }
    return () => (mounted = false);
  }, []);

  const getAverage = (reviews) => {
    const ratings = reviews.map((review) => Number(review.rating));
    const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return average > 0 ? average : 'not yet rated by members';
  };
  if (reviews) {
    return (
      <div id="book-feedback">
        {reviews.length ? (
          <>
            <h2>Member Feedback</h2> Average Member Rating:{' '}
            <span style={{ color: 'green', padding: '.5rem' }}>
              {getAverage(reviews)}
            </span>
            <span style={{ fontSize: '1rem' }}>
              (based on {reviews.length} rating
              {reviews.length > 1 || reviews.length === 0 ? 's' : ''})
            </span>
            <div id="reviews">
              <h4>Member Reviews</h4>
              <div>
                {reviews.map((review, idx) => (
                  <div key={idx}>
                    {review.text} <span>- {review.member.firstName}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <h2>Member Reviews</h2>No members have left reviews for this
            selection yet
          </div>
        )}
        <Link to={`/bookclubs/${props.bookclub.id}/feedback/add`}>
          Add Your Review Here{' '}
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export const BookFeedback = connect((state) => state)(_BookFeedback);
