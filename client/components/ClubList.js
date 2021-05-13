import React from 'react';
import '../../public/css/ClubList.css';
export const ClubList = (props) => {
  return (
    <div id="clublist">
      {props.clubs.length ? (
        <div></div>
      ) : (
        <div>
          <p>You are not currently a member of any clubs.</p>
          <p>
            <button>+ Start a club</button>
          </p>
        </div>
      )}
    </div>
  );
};
