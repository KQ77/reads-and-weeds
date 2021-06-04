import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import '../../public/css/EditFeedback.css';
import axios from 'axios';

const _EditFeedback = (props) => {
  const ratingsArr = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  ];
  const { comments, ratings } = props.book;
  let memberComment =
    comments.find((comment) => comment.memberId === props.auth.id) || '';
  const memberRating = ratings.find(
    (rating) => rating.memberId === props.auth.id || ''
  );
  const [comment, setComment] = useState(memberComment.text || '');
  const [rating, setRating] = useState(memberRating || null);
  const isRated = props.book.comments.some(
    (comment) => comment.memberId === props.auth.id
  );
  const handleSubmit = async ({ rating, comment, bookId }) => {
    if (isRated) {
      await axios.put(`/api/feedback/${bookId}`, {
        rating,
        comment,
      });
    } else {
      await axios.post(`/api/feedback/${bookId}`, { rating, comment });
      //pop up here saying success?
    }
    props.fetchClub(props.match.params.id * 1);
    window.location.reload();
  };
  console.log(props, 'props of edit feedback ');
  if (!props.book) return null;
  else
    return (
      <div id="edit-feedback">
        <h2>{props.book.title}</h2>
        <Form>
          <Form.Group className="member-rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <option>---</option>
              {ratingsArr.map((_rating, idx) => (
                <option value={_rating} key={idx}>
                  {_rating}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Review</Form.Label>
            <Form.Control
              className="member-review"
              as="textarea"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></Form.Control>
          </Form.Group>
          <Button
            onClick={() =>
              handleSubmit({ rating, comment, bookId: props.book.id })
            }
            variant="info"
          >
            submit review
          </Button>
        </Form>
      </div>
    );
};

const mapDispatch = (props) => {
  return {
    updateFeedback: () => updateFeedback(),
    addFeedback: () => addFeedback(),
  };
};
export const EditFeedback = connect(
  (state) => state,
  mapDispatch
)(_EditFeedback);
