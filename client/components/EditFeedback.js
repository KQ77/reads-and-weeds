import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Burger, Footer } from './index';
import '../../public/css/EditFeedback.css';
import { setAuth } from '../redux/auth';
import axios from 'axios';

const _EditFeedback = (props) => {
  const ratingsArr = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  ];
  //passed in from addfeedback component
  const { reviews } = props.book;
  useEffect(() => {
    //if no props.auth - fetch user by cookie token if there is one
    if (!props.auth) {
      props.setAuth();
    }
  }, []);

  const memberReview =
    reviews.find((review) => review.memberId === props.auth.id) || '';

  const [text, setText] = useState(memberReview.text || '');
  const [rating, setRating] = useState(memberReview.rating || undefined);
  const [error, setError] = useState(undefined);
  const handleSubmit = async (text, bookId, rating, clubId) => {
    try {
      if (!text.length || !rating || rating === '---') {
        console.log('no text or no rating');
        setError('please fill out all fields');
      } else {
        if (memberReview) {
          await axios.put(`/api/reviews/${memberReview.id}`, {
            text,
            rating,
            bookId,
            clubId,
          });
        } else {
          await axios.post(`/api/reviews`, { text, rating, bookId, clubId });
        }
        // props.fetchClub(props.match.params.id * 1);
        props.setSelectedId(undefined);
      }
    } catch (error) {
      console.log(error, 'error ');
    }
  };
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
              value={rating || undefined}
              onChange={(e) => setRating(e.target.value)}
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
              placeholder="what did you think of this selection? let your feedback here!"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></Form.Control>
          </Form.Group>
          <div className="error">{error}</div>

          <Button
            onClick={() =>
              handleSubmit(text, props.book.id, rating, props.match.params.id)
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
    setAuth: () => setAuth(),
    updateFeedback: () => updateFeedback(),
    addFeedback: () => addFeedback(),
  };
};
export const EditFeedback = connect(
  (state) => state,
  mapDispatch
)(_EditFeedback);
