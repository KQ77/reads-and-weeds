import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import '../../public/css/CreateClub.css';
import axios from 'axios';
import { setAuth } from '../redux/auth';

const _CreateClub = (props) => {
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    location: '',
    private: false,
    displayImage: '/images/defaultClub.jpeg',
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClubData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createClub = async (e) => {
    e.preventDefault();
    const club = (await axios.post('/api/clubs', clubData)).data;
    props.history.push(`/bookclubs/${club.id}`);
  };
  console.log(clubData, 'clubData');
  return (
    <div id="create-club">
      <div className="club-image-upload">
        <Button variant="info">upload club image</Button>
      </div>
      <div className="form">
        <Form onSubmit={(e) => createClub(e)}>
          <Form.Group>
            <Form.Label>Name Your Club</Form.Label>
            <Form.Control
              onChange={(e) => handleFormChange(e)}
              type="text"
              name="name"
              value={clubData.name}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Describe your club </Form.Label>
            <Form.Control
              onChange={(e) => handleFormChange(e)}
              name="description"
              type="text"
              value={clubData.description}
            ></Form.Control>
          </Form.Group>{' '}
          <Form.Group>
            <Form.Label>Add a club location (optional)</Form.Label>
            <Form.Control
              onChange={(e) => handleFormChange(e)}
              type="text"
              name="location"
              value={clubData.location}
            ></Form.Control>
          </Form.Group>
          <Form.Label>
            <strong>Set your club privacy</strong>
          </Form.Label>
          <Form.Check
            onChange={(e) => handleFormChange(e)}
            label="public"
            type="radio"
            name="private"
            value={false}
          ></Form.Check>
          <Form.Check
            label="private"
            name="private"
            onChange={(e) => handleFormChange(e)}
            type="radio"
            value={true}
          ></Form.Check>
          <Button type="submit">Create</Button>
        </Form>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const CreateClub = connect((state) => state, mapDispatch)(_CreateClub);
