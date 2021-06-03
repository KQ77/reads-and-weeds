import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Image } from 'react-bootstrap';
import '../../public/css/CreateClub.css';
import { fetchClub } from '../redux/bookclub';
import axios from 'axios';

//initially set
const _EditClub = (props) => {
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    location: '',
    private: false,
  });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  // const [src, setSrc] = useState('');

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const fetchClub = async () => {
    const club = (await axios.get(`/api/clubs/${props.match.params.id}`)).data;
    const { name, description, location } = club;
    setClubData({ name, description, location, private: club.private });
    // setSrc(club.displayImage);
    setPreview(club.displayImage);
  };
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const handleFormChange = (e) => {
    let { name, value } = e.target;
    if (value === 'false') value = false;
    if (value === 'true') value = true;
    console.log(typeof value, 'type of value');
    setClubData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchClub();
    }
    return () => (mounted = false);
  }, []);
  return (
    <div id="edit-club">
      <div className="form">
        <img src={preview} />

        <Form
          action={`/api/admin/clubs/${props.match.params.id}/`}
          encType="multipart/form-data"
          method="POST"
        >
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload new image</Form.Label>
            <Form.Control
              onChange={(e) => handleFileChange(e)}
              name="image"
              type="file"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit Club Name</Form.Label>
            <Form.Control
              onChange={(e) => handleFormChange(e)}
              type="text"
              name="name"
              value={clubData.name}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Update description </Form.Label>
            <Form.Control
              onChange={(e) => handleFormChange(e)}
              name="description"
              as="textarea"
              value={clubData.description}
            ></Form.Control>
          </Form.Group>{' '}
          <Form.Group>
            <Form.Label>Update club location</Form.Label>
            <Form.Control
              onChange={(e) => handleFormChange(e)}
              type="text"
              name="location"
              value={clubData.location}
            ></Form.Control>
          </Form.Group>
          <Form.Label>
            <strong>Update club privacy</strong>
          </Form.Label>
          <Form.Check
            onChange={(e) => handleFormChange(e)}
            label="public"
            type="radio"
            name="private"
            checked={!clubData.private}
            value={false}
          ></Form.Check>
          <Form.Check
            label="private"
            name="private"
            checked={clubData.private}
            onChange={(e) => handleFormChange(e)}
            type="radio"
            value={true}
          ></Form.Check>
          <Button type="submit">Update</Button>
        </Form>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    fetchClub: (id) => dispatch(fetchClub(id)),
  };
};

export const EditClub = connect((state) => state, mapDispatch)(_EditClub);
