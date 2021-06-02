import React, { useEffect, useState } from 'react';
import '../../public/css/EditPhoto.css';
import axios from 'axios';
import { Image, Form, Button } from 'react-bootstrap';

export const EditPhoto = (props) => {
  const [src, setSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const fetchMemberPhoto = async () => {
    const id = props.match.params.id;
    const member = (await axios.get(`/api/members/${id}`)).data;
    setPreview(member.imageUrl);
  };

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

  const fetchClubPhoto = async () => {
    const id = props.match.params.id;
    const club = (await axios.get(`/api/clubs/${id}`)).data;
    setPreview(club.displayImage);
  };
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    console.log(e.target.files, 'e.target.files');
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    if (props.profile) {
      fetchMemberPhoto();
    } else if (props.club) {
      fetchClubPhoto();
    }
  }, []);
  const { id } = props.match.params;
  return (
    <div id="edit-photo">
      <Image roundedCircle thumbnail src={preview} />
      <Form
        action={
          props.profile
            ? `/api/members/${id}/upload`
            : `/api/clubs/${id}/upload`
        }
        method="post"
        encType="multipart/form-data"
      >
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            change {props.profile ? 'profile image' : 'club image'}
          </Form.Label>
          <Form.Control
            onChange={(e) => handleFileChange(e)}
            name="image"
            type="file"
          />
        </Form.Group>
        <Button type="submit">Save Image</Button>
      </Form>
    </div>
  );
};
