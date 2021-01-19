import React from 'react';
import '../public/Banner.css';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';

// const library = require('../public/library.jpg');
// const hike = require('../images/hike_e1f0015.jpg');
// import Hike from '../public/hike.jpg';
// import Library from '../public/library.jpg';

export const Banner = (props) => {
  const fadeImages = ['./hike.jpg', './library.jpg'];
  const fadeProperties = {
    autoplay: true,
    arrows: false,
    duration: 2000,
    transitionDuration: 2000,
    infinite: true,
  };

  return (
    <div className="slide-container">
      <Fade {...fadeProperties}>
        <div className="each-fade">
          <div>
            <img className="banner-image" src={fadeImages[0]} />
          </div>
        </div>
        <div className="each-fade">
          <div>
            <img className="banner-image" src={fadeImages[1]} />
          </div>
        </div>
      </Fade>
      <div id="banner-text">
        <h1>Reads &amp; Weeds </h1> <h2>Read. Meet. Weed. Eat. Repeat. </h2>
      </div>
    </div>
  );
};
