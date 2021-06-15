import React, { useState, useEffect } from 'react';
import '../../public/css/SingleMember.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Footer, Burger } from './index';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const _SingleMember = (props) => {
  const [member, setMember] = useState({});
  useEffect(() => {
    let mounted = true;
    const fetchMember = async (id) => {
      const member = (await axios.get(`/api/members/${id}`)).data;
      setMember(member);
    };
    if (mounted) {
      fetchMember(props.match.params.id * 1);
    }
    return () => {
      mounted = false;
    };
  }, []);
  const isMember = (props) => {
    return member.id === props.auth.id;
  };
  console.log(props, 'props');
  if (!member) {
    return null;
  } else {
    return (
      <>
        <Burger {...props} />
        <div id="single-member">
          <Image
            className="member-img"
            src={member.imageUrl}
            roundedCircle
          ></Image>
          <div className="profile-bg shaded"></div>
          <div className="profile-bg">
            <span>{member.firstName}</span>

            {isMember(props) ? (
              <Link to={`/members/${member.id}/profile/edit`}>edit</Link>
            ) : (
              ''
            )}
          </div>
          <div className="member-details">
            <div className="member-bio">
              <span className="bold">Bio</span>
              <p>{member.bio}</p>
            </div>
            <div>
              <span className="bold">Favorites</span>
              <p>
                <span>Book: </span>
                {member.faveBook}
              </p>
              <p>
                <span>Book Club Selection: </span>
                {member.favePick}
              </p>
              <p>
                <span>Genre: </span>
                {member.genre}
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }
};

export const SingleMember = connect((state) => state)(_SingleMember);
