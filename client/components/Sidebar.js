import React, { useState, useEffect } from 'react';
import '../../public/css/Sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
const _Sidebar = (props) => {
  const { members } = props.bookclub;
  const isMember = (props) => {
    return props.bookclub.members.find((member) => member.id === props.auth.id);
  };
  //write function to check if request has been sent
  const requested = () => {};
  const leaveClub = (props) => {
    // what to do  first and then what? update in redux state at all?
    await axios.delete(`/api/clubmembers/:clubId/:memberId`);
    props.fetchClub(props.match.params.id);
  };
  const addMember = async (props) => {
    //if club is private, create request to join
    if (props.bookclub.private) {
      await axios.post(`/api/clubs/${props.bookclub.id}/requests`, {
        memberId: props.auth.id,
        clubId: props.bookclub.id,
      });
    } else {
      await axios.post(`/api/members/${props.auth.id}/clubs`, {
        clubId: props.bookclub.id,
        memberId: props.auth.id,
      });
    }
    props.fetchClub(props.match.params.id);
  };
  return (
    <div id="sidebar">
      <div>
        <h3>{props.bookclub.name}</h3>
        <span>{props.bookclub.location}</span>
        <span>{props.bookclub.private ? 'private' : 'public'}</span>
        {!isMember(props) ? (
          <button onClick={() => addMember(props)}>
            + {props.bookclub.private ? 'ask to join' : 'join'}
          </button>
        ) : (
          <button onClick={() => leaveClub()}>- leave club</button>
        )}
      </div>
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
