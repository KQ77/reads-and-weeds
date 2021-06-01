import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
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
  const fetchClub = async () => {
    const club = (await axios.get(`/api/clubs/${props.match.params.id}`)).data;
    const { name, description, location } = club;
    setClubData({ name, description, location, private: club.private });
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClubData((prevData) => ({ ...prevData, [name]: value }));
  };
  const updateClub = async (e) => {
    e.preventDefault();
    console.log(clubData, 'clubdata');
    const { id } = props.match.params;
    await axios.put(`/api/admin/clubs/${id}`, clubData);
    props.history.push(`/bookclubs/${id}`);
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
        <Form onSubmit={(e) => updateClub(e)}>
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
            value={false}
          ></Form.Check>
          <Form.Check
            label="private"
            name="private"
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
