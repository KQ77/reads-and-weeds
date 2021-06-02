import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../public/css/EditProfile.css';
import { EditPhoto } from './EditPhoto';

const _EditProfile = (props) => {
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    genre: '',
    favePick: '',
    faveBook: '',
  });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(member.imageUrl || '');
  useEffect(() => {
    let mounted = true;
    async function fetchProfile(id) {
      const member = (await axios.get(`/api/members/${id}`)).data;
      const { firstName, lastName, bio, genre, favePick, faveBook } = member;
      setMember({ firstName, lastName, bio, genre, favePick, faveBook });
      setPreview(member.imageUrl);
    }
    if (mounted) {
      //fetch member info  /api/members/:id/
      fetchProfile(props.match.params.id * 1);
    }
    return () => (mounted = false);
  }, []);

  //when file is selected - create a preview and set that in state
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

  //when user selects a file
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    console.log(e.target.files, 'e.target.files');
    setSelectedFile(e.target.files[0]);
  };
  const updateMember = (e) => {
    setMember((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e, props) => {
    const { id } = props.match.params;
    await axios.put(`/api/members/${id}`, member);
    props.history.push(`/members/${id}`);
  };
  return (
    <div id="edit-profile">
      <h1>Edit Your Info</h1>
      <EditPhoto {...props} profile={true} />
      {/* <Form>
        <div>
          <Image
            style={{
              border: '1px solid black',
              top: '75%',
              left: '5.5rem',
              height: '3.5rem',
              position: 'absolute',
            }}
            roundedCircle
            src="/images/camera.png"
          />
          <Image thumbnail src={member.imageUrl}></Image>
        </div> */}
      {/* <Form method="post" action="`/api/members/:memberId/update"> */}
      <Form className="edit-profile">
        {/* <Image thumbnail roundedCircle src={preview} /> */}
        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload new image</Form.Label>
          <Form.Control
            onChange={(e) => handleFileChange(e)}
            name="image"
            type="file"
          />
        </Form.Group> */}
        <Form.Row>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control
              placeholder="first name"
              name="firstName"
              value={member.firstName || ''}
              onChange={(e) => updateMember(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              placeholder="last name"
              name="lastName"
              value={member.lastName || ''}
              onChange={(e) => updateMember(e)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group style={{ width: '60%' }}>
          <Form.Label> Bio</Form.Label>
          <Form.Control
            style={{ minHeight: '8rem' }}
            placeholder="a little about yourself..."
            name="bio"
            as="textarea"
            value={member.bio || ''}
            onChange={(e) => updateMember(e)}
          ></Form.Control>
        </Form.Group>
        <Form.Row style={{ justifyContent: 'space-between' }}>
          <Form.Group>
            <Form.Label> Favorite Genre</Form.Label>
            <Form.Control
              name="genre"
              value={member.genre || ''}
              onChange={(e) => updateMember(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label> Favorite Book Club Pick</Form.Label>
            <Form.Control
              name="favePick"
              value={member.favePick || ''}
              onChange={(e) => updateMember(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label> Favorite Book(s) Of All Time</Form.Label>
            <Form.Control
              name="faveBook"
              value={member.faveBook || ''}
              onChange={(e) => updateMember(e)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>
        <Button onClick={(e) => handleSubmit(e, props)}>SAVE CHANGES</Button>
        {/* <Button type="submit">SAVE CHANGES</Button> */}
      </Form>
    </div>
  );
};

// const mapDispatch = (dispatch) => {
//   return {
//     fetchProfile: (id) => dispatch(fetchMember(id)),
//   };
// };
export const EditProfile = connect((state) => state)(_EditProfile);
