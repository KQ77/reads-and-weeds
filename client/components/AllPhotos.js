import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Burger } from './index';
import '../../public/css/AllPhotos.css';

//url /bookclubs/:id/photos
const _AllPhotos = (props) => {
  const [photos, setPhotos] = useState([]);
  const [fileChange, setFileChange] = useState(false);
  useEffect(() => {
    console.log('use effect allphotos');
    let mounted = true;
    const fetchPhotos = async () => {
      const id = props.match.params.id;
      const photos = (await axios.get(`/api/clubs/${id}/photos`)).data;
      setPhotos(photos);
    };
    if (mounted) {
      fetchPhotos();
    }
    return () => (mounted = false);
  }, []);
  if (photos.length) {
    return (
      <>
        <Burger {...props} />
        <div id="all-photos">
          <h2>Club Photos</h2>
          <Row>
            <Form
              action={`/api/clubs/${props.match.params.id}/photos`}
              encType="multipart/form-data"
              method="POST"
            >
              <Form.File
                onChange={() => setFileChange(true)}
                name="photos"
                multiple
              ></Form.File>
              <Button
                disabled={fileChange === false}
                type="submit"
                variant="info"
              >
                + add photos
              </Button>
            </Form>
          </Row>

          <div id="club-photos">
            {photos.map((photo, idx) => (
              <div key={idx}>
                <a href={photo.src}>
                  <Image thumbnail src={photo.src}></Image>
                </a>
              </div>
            ))}
          </div>
        </div>
      </>
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
