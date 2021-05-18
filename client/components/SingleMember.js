import React, { useState, useEffect } from 'react';
import '../../public/css/SingleMember.css';
// import axios from 'axios';
import { connect } from 'react-redux';
import { Footer } from './index';
import { Link } from 'react-router-dom';

const _SingleMember = (props) => {
  // const [member, setMember] = useState({});
  // const { id } = props;
  // useEffect(async () => {
  //   const member = (await axios.get(`/api/members/${id}`)).data;
  //   setMember(member);
  // }, []);
  const isMember = (props) => {
    return props.member.id === props.auth.id;
  };
  const { member } = props;
  if (!member) {
    return null;
  } else {
    return (
      <div id="single-member">
        <p>add back to home link here</p>
        <div className="member-wrapper">
          <div className="member-img-wrapper">
            <img className="member-img" src={member.imageUrl} />
          </div>
          <div className="member-details">
            <h2 className="heading bold">{member.firstName}</h2>
            <p>
              <span className="bold">Favorite Genre </span>
              <br></br>
              {member.genre}
            </p>
            <p>
              <span className="bold">Favorite Book</span>
              <br></br>
              {member.faveBook}
            </p>
            <p>
              <span className="bold">Favorite Book Club Pick </span>
              <br></br>
              {member.favePick}
            </p>
            <p className="bio">
              <span className="bold">Bio: </span> <br></br>
              {member.bio}
            </p>
            {isMember(props) ? (
              <Link
                to={`/bookclubs/${props.bookclub.id}/members/${member.id}/profile/edit`}
              >
                edit profile
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
};
const mapState = (state, routeProps) => {
  const member = state.bookclub.members.find(
    (member) => member.id === routeProps.match.params.id * 1
  );
  return {
    auth: state.auth,
    bookclub: state.bookclub,
    member,
  };
};
export const SingleMember = connect(mapState)(_SingleMember);
