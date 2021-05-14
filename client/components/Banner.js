import React from 'react';
import '../../public/css/Banner.css';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import { connect } from 'react-redux';

const _Banner = (props) => {
  console.log(props, 'props');
  // const fadeImages = ['./hike.jpg', './library.jpg'];
  const fadeImages = props.bookclub.images
    ? props.bookclub.images.map((img) => img.src)
    : null;
  console.log(fadeImages, 'fadeImages');
  const fadeProperties = {
    autoplay: true,
    arrows: false,
    duration: 2000,
    transitionDuration: 2000,
    infinite: true,
  };
  if (fadeImages) {
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
          <h1>{props.bookclub.name} </h1> <h2>{props.bookclub.tagline} </h2>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export const Banner = connect((state) => state)(_Banner);
