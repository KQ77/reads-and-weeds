import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Button, Form } from 'react-bootstrap';
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
  //   const [files, setFiles] = useState([]);
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const id = props.match.params.id;
  //     const formData = new FormData();
  //     console.log(files, 'files');
  //     formData.append('files', files);
  //     await axios.post(
  //       `/api/clubs/${id}/photos`,
  //       { formData },
  //       { headers: { 'content-type': 'multipart/form-data' } }
  //     );
  //     // const photos = (await axios.get(`/api/clubs/${id}/photos`)).data;
  //     // setPhotos(photos);
  //     for (var pair of formData.entries()) {
  //       console.log(pair[0] + ', ' + pair[1]);
  //     }
  //   };
  if (photos.length) {
    return (
      <div>
        <h2>Book Club Photos</h2>

        <Form
          action={`/api/clubs/${props.match.params.id}/photos`}
          encType="multipart/form-data"
          method="POST"
        >
          <Form.File name="photos" multiple></Form.File>
          <Button type="submit" variant="info">
            + add photos
          </Button>
        </Form>
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
