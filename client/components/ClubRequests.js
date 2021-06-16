import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../public/css/ClubRequests.css';
import { Card, Button } from 'react-bootstrap';
import { setAuth } from '../redux/auth';
import { Burger, Footer } from './index';
import { Link } from 'react-router-dom';

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
    <>
      <Burger {...props} />

      <div id="club-requests">
        <h2>Book Club Join Requests</h2>
        {requests.length ? (
          <div id="request-wrapper">
            {requests.map((req, idx) => (
              <div key={idx}>
                <Card style={{ width: '8rem', textAlign: 'center' }}>
                  <Card.Img src={req.member.imageUrl}></Card.Img>
                  <Card.Title>
                    {req.member.firstName} {req.member.lastName}
                  </Card.Title>

                  <Button
                    className="approve"
                    onClick={() =>
                      approve(req.member.id, props.match.params.id, req.id)
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    className="ignore"
                    onClick={() => remove(props.match.params.id, req.id)}
                  >
                    Ignore
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div id="no-requests">
            <h2>All caught up! </h2>
            <h3>Currently there are no requests to join this club.</h3>
            <p>
              <Link to={`/bookclubs/${props.match.params.id}`}>
                return to main club page
              </Link>
            </p>
          </div>
        )}
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
export const ClubRequests = connect((state) => state, mapDispatch)(_Requests);
