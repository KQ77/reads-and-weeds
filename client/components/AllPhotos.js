import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Burger } from './index';
import '../../public/css/AllPhotos.css';
import { fetchClub } from '../redux/bookclub';
import { Link } from 'react-router-dom';
//url /bookclubs/:id/photos
const _AllPhotos = (props) => {
  const [photos, setPhotos] = useState([]);
  const [fileChange, setFileChange] = useState(false);
  useEffect(() => {
    props.fetchClub(props.match.params.id);
  }, []);
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
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Burger {...props} />
      <div id="all-photos">
        <Row>
          <Link to={`/bookclubs/${props.match.params.id}`}>back to club</Link>
        </Row>
        <h2>
          {photos.length
            ? `${props.bookclub.name} Photos`
            : 'Your Club Has No Photos - be the first to add some!'}
        </h2>
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
  // } else {
  //   return (
  //     <>
  //       <Burger {...props} />
  //       <div className="no-photos">
  //         <div>
  //           <p>Your club has no photos yet.. why not add some of your own?</p>
  //           <Button variant="info">+ add photos</Button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
};

const mapDispatch = (dispatch) => {
  return {
    fetchClub: (clubId) => dispatch(fetchClub(clubId)),
  };
};

export const AllPhotos = connect((state) => state, mapDispatch)(_AllPhotos);
