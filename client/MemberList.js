import React from 'react';
import '../public/MemberList.css';

export const MemberList = (props) => {
  return (
    <>
      {props.members.map((member, idx) => {
        return (
          <div key={idx} className="member-wrapper">
            <div className="flex-row">
              <div className="member-img-wrapper" key={idx}>
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
        );
      })}
    </>
  );
};

export default MemberList;
