import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../public/css/ClubRequests.css';
import { Card, Button } from 'react-bootstrap';
import { setAuth } from '../redux/auth';

const _Requests = (props) => {
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    const requests = (
      await axios.get(`/api/admin/clubs/${props.match.params.id}/requests`)
    ).data;
    setRequests(requests);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchRequests();
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!props.auth.id) {
        props.setAuth();
      }
    }
  }, []);
  const approve = async (memberId, clubId, requestId) => {
    await axios.post(`/api/admin/members/${props.auth.id}/clubs`, {
      clubId,
      requestId,
      memberId,
    });
    fetchRequests();
  };
  const remove = async (clubId, id) => {
    await axios.delete(`/api/admin/clubs/${clubId}/requests/${id}`);
    fetchRequests();
  };
  return (
    <div id="club-requests">
      {requests.length
        ? requests.map((req, idx) => (
            <div key={idx}>
              <Card style={{ width: '8rem' }}>
                <Card.Img src={req.member.imageUrl}></Card.Img>
                <Card.Title>
                  {req.member.firstName} {req.member.lastName}
                </Card.Title>

                <Button
                  onClick={() =>
                    approve(req.member.id, props.match.params.id, req.id)
                  }
                >
                  Approve
                </Button>
                <Button onClick={() => remove(props.match.params.id, req.id)}>
                  Delete
                </Button>
              </Card>
            </div>
          ))
        : 'All caught up!'}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuth()),
  };
};
export const ClubRequests = connect((state) => state, mapDispatch)(_Requests);