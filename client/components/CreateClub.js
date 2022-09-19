import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Image, Col } from 'react-bootstrap';
import '../../public/css/CreateClub.css';
import axios from 'axios';
import { setAuth } from '../redux/auth';
import { Burger, Footer } from './index';

const _CreateClub = (props) => {
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    location: '',
    private: false,
  });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('/images/defaultClub.jpeg');

  useEffect(() => {
    if (!selectedFile) {
      setPreview('/images/defaultClub.jpeg');
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  //when user selects a file
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClubData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <>
      <Burger {...props} />
      <h2
        style={{
          fontWeight: '100',
          textAlign: 'center',
          padding: '2rem',
          color: 'gray',
        }}
      >
        {' '}
        New Club Details
      </h2>

      <div id="create-club">
        <div className="form">
          <Form
            action={`/api/clubs`}
            method="post"
            encType="multipart/form-data"
          >
            <Form.Row>
              <Col xs={4}>
                <Image thumbnail src={preview} />
                <Form.Group className="file-input" controlId="formFile">
                  <Form.Label>Upload new image</Form.Label>
                  <Form.Control
                    style={{ display: 'flex' }}
                    onChange={(e) => handleFileChange(e)}
                    name="image"
                    type="file"
                  />
                </Form.Group>
              </Col>
              <Col alignItems="center">
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
                </Form.Group>
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
              </Col>
            </Form.Row>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const CreateClub = connect((state) => state, mapDispatch)(_CreateClub);
