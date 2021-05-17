import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//url --- /bookclubs/:id/feedback
//display all books - when you click it expands an area to fill in a form to give feedback? rating/comments/reviews, etc?
//acess books through --- ??boocklub.books ? for each one, display the name? then click on it and it will open a form?
const _Feedback = (props) => {
  return <div></div>;
};

const mapDispatch = (dispatch) => {
  return {};
};
export const Feedback = connect((state) => state)(_Feedback);
