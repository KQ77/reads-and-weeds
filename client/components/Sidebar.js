import React, { useState, useEffect } from 'react';
import '../../public/css/Sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const _Sidebar = (props) => {
  const { members } = props.bookclub;
  return (
    <div id="sidebar">
      <h2>Members ({members.length})</h2>
      <ul>
        {members.map((member, idx) => (
          <li key={idx}>
            <div className="img-background">
              <img
                style={{
                  height: '3rem',
                  width: '3rem',
                  margin: '.2rem',
                }}
                className="member-img"
                src={member.imageUrl}
              />
            </div>
            <div className="member-name">
              <Link to={`/members/${member.id}`}>{member.firstName}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Sidebar = connect((state) => state)(_Sidebar);
