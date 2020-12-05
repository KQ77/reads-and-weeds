import React from 'react';
import '../public/MemberList.css';

export const MemberList = (props) => {
  return (
    <>
      {props.members.map((member, idx) => {
        return (
          <div className="member-wrapper">
            <div className="flex-row">
              <div className="member-img-wrapper" key={idx}>
                <img className="member-img" src={member.imageUrl} />
              </div>
              <div className="member-details">
                <p className="bold large">
                  {member.firstName} {member.lastName}
                </p>
                <p>Favorite Genre:{member.genre}</p>
                <p>Favorite Book: {member.faveBook}</p>
                <p>Favorite BookClub Pick: {member.favePick}</p>
                <div className="bio">Bio: {member.bio}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MemberList;
