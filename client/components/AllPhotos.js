import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../public/css/AllPhotos.css';

//url /bookclubs/:id/photos
const _AllPhotos = (props) => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    let mounted = true;
    const fetchPhotos = async () => {
      const id = props.match.params.id;
      const photos = (await axios.get(`/api/clubs/${id}/photos`)).data;
      setPhotos(photos);
    };
    if (mounted) {
      fetchPhotos();
    }
  }, []);
  if (photos.length) {
    return (
      <div>
        <h2>Book Club Photos</h2> <Button variant="info">+ add photos</Button>
        <div id="all-photos">
          <br></br>
          {photos.map((photo, idx) => (
            <div style={{ width: '20rem' }} key={idx}>
              <Image src={photo.src}></Image>{' '}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>no club photos yet</p>
        <Button variant="info">+ add photos</Button>
      </div>
    );
  }
};

export const AllPhotos = connect((state) => state)(_AllPhotos);
