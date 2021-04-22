import React, { useState, useEffect } from 'react';
import '../public/SingleMember.css';
import axios from 'axios';

const SingleMember = (props) => {
  const [member, setMember] = useState({});
  const { id } = props;
  useEffect(async () => {
    const member = (await axios.get(`/api/members/${id}`)).data;
    setMember(member);
  }, []);
  if (!member) {
    return null;
  } else {
    return (
      <div id="single-member">
        <div className="member-wrapper">
          <div className="flex-row">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleMember;
