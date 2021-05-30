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
  const isAdmin = (props) => props.auth.id === props.bookclub.adminId;

  //write function to check if request has been sent
  //bookclub may not always be in state
  const requested = (props) => {
    //check to see if this club's member
    const { requests } = props.bookclub;
    return requests.find((request) => request.memberId === props.auth.id);
  };
  const leaveClub = async (props, clubId, memberId) => {
    // what to do  first and then what? update in redux state at all?
    await axios.delete(`/api/clubmembers/${clubId}/${memberId}`);
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
          <button disabled={requested(props)} onClick={() => addMember(props)}>
            +
            {props.bookclub.private
              ? requested(props)
                ? 'request sent'
                : 'ask to join'
              : 'join'}
          </button>
        ) : (
          <button
            onClick={() => {
              leaveClub(props, props.bookclub.id, props.auth.id);
            }}
          >
            Leave Club
          </button>
        )}
        {isAdmin(props) ? (
          <div>
            <Link to={`/bookclubs/${props.bookclub.id}/requests`}>
              approve join requests
            </Link>
          </div>
        ) : (
          ''
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
