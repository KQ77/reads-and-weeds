import React from 'react';
import '../../public/css/Footer.css';

export const Footer = (props) => {
  return (
    <div id="footer">
      <div>
        <p>
          <img src="/images/logo2.png" />
        </p>
      </div>
      <div>
        <p>About</p>
        <p>Contact Us</p>
        {/* <p>Report Bugs</p> */}
      </div>
    </div>
  );
};
