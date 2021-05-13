import React from 'react';
import '../../public/css/Comments.css';

function Comments(props) {
  const { comments } = props.book;

  return (
    <div>
      <h2>What Our Members Thought</h2>
      {!comments.length ? (
        <div id="comments">
          <p>- - there are no member comments for this book - -</p>
        </div>
      ) : (
        <div id="comments">
          {comments.map((comment) => (
            <p>{comment.text}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
