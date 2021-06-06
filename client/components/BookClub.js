import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Link, Redirect } from 'react-router-dom';
import { fetchClub } from '../redux/bookclub';
import DatePicker from 'react-datepicker';
import { setAuth } from '../redux/auth';
import { CreateInvite } from './CreateInvite';
import { LimitedViewClub } from './LimitedViewClub';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import {
  Sidebar,
  Banner,
  SingleBook,
  BookList,
  Suggestions,
  Footer,
  PhotoReel,
  Burger,
} from './index';
import '../../public/css/BookClub.css';
import { Button, Modal } from 'react-bootstrap';

const _BookClub = (props) => {
  const clubId = props.match.params.id;
  const isMember = (props) => {
    return props.bookclub.members.find((member) => member.id === props.auth.id);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [showInvite, setShowInvite] = useState(false);
  const handleClose = () => setShowInvite(false);

  useEffect(() => {
    props.fetchClub(props.match.params.id * 1);
  }, []);

  // if no props.auth.id, then fetch auth and set ID
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!props.auth) {
        props.setAuth();
      }
    }
    return () => (mounted = false);
  }, []);

  //if club is private and person is not a member, see limited view - if public and user is a member, show full view
  const hasAccess = () => {
    if (props.bookclub.private === false) {
      return true;
    } else if (
      props.bookclub.private &&
      props.bookclub.members.find((member) => member.id === props.auth.id)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const saveDate = async (e) => {
    const hour =
      startDate.getHours() > 12
        ? startDate.getHours() - 12
        : startDate.getHours();
    const minutes =
      startDate.getMinutes() !== 0 ? startDate.getMinutes() : '00';
    let tod;
    if (startDate.getHours() === 24 || startDate.getHours() < 12) tod = 'AM';
    else tod = 'PM';

    const date = `${startDate.toLocaleDateString()} @ ${hour}:${minutes}${tod}`;

    await axios.put(`/api/clubs/${clubId}`, {
      meetDate: date,
    });
    props.fetchClub(clubId);
  };
  const current = props.bookclub.books
    ? props.bookclub.books.find((book) => book.isCurrent)
    : undefined;

  if (props.bookclub.id) {
    return (
      <div id="bookclub">
        <Burger {...props} />
        {hasAccess() && <Banner />}
        {hasAccess() ? (
          <div className="flex-container">
            <Sidebar {...props} />
            <div id="right">
              <div>
                <h2>Next Meet-Up Date: {props.bookclub.meetDate}</h2>
                {isMember ? (
                  <div>
                    <div>
                      Edit Date
                      <DatePicker
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mmaa"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      <Button onClick={(e) => saveDate(e)}>Save Date</Button>
                    </div>
                    <Button onClick={() => setShowInvite(true)}>
                      + Invite a friend
                    </Button>
                    <Modal show={showInvite} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Invite a member</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <CreateInvite
                          handleClose={handleClose}
                          clubId={props.bookclub.id}
                          {...props}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <section id="current-selection">
                {!current ? (
                  <div id="no-current">
                    <p>
                      Currently reading a book? Find it and select it as your
                      current book
                    </p>
                    <Link
                      to={`/bookclubs/${props.bookclub.id}/suggestions/search`}
                    >
                      <Button>Find a book</Button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <h1 className="section-heading">Current Selection</h1>
                    <SingleBook bookId={current.id} />
                  </div>
                )}
                {/* {isMember ? <Link>add feedback</Link> : ''} */}
              </section>
              <section id="suggestions">
                {props.bookclub.suggestions.length ? (
                  <>
                    <div className="flex-row">
                      <h1 className="section-heading">Suggestions</h1>
                      <h2>Books added by members for consideration</h2>
                      <Link
                        to={`/bookclubs/${props.bookclub.id}/suggestions/search`}
                      >
                        <Button variant="info">+ add a book</Button>
                      </Link>
                    </div>
                    {/* <Suggestions /> */}
                  </>
                ) : (
                  <div id="no-suggestions">
                    <div>
                      <h3>Have a book idea?</h3>
                      <p>
                        Start planning for your next book. Share your book
                        recommendations, and inspire each other
                      </p>
                      <Link
                        to={`/bookclubs/${props.bookclub.id}/suggestions/search`}
                      >
                        {' '}
                        <Button>Find a book</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </section>
              <section id="past-selections">
                {props.bookclub.books.some(
                  (book) => book.isCurrent === false
                ) ? (
                  <>
                    <div>
                      <h1 className="section-heading">Past Selections</h1>
                      <Link to={`/bookclubs/${props.bookclub.id}/feedback/add`}>
                        rate/review past selections
                      </Link>
                      <Link to={`/bookclubs/${props.bookclub.id}/books`}>
                        view all
                      </Link>
                    </div>
                    {/* <BookList past={true} clubId={props.bookclub.id} /> */}
                  </>
                ) : (
                  <div id="no-past-books">
                    <div>
                      <h3>Track Your Progress</h3>

                      <p>
                        Add your club's completed books, and share your thoughts
                        on each one...
                      </p>
                      <Link
                        to={`/bookclubs/${props.bookclub.id}/suggestions/search`}
                      >
                        <Button>Find a book</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </section>
              <section id="photos">
                {props.bookclub.images.length ? (
                  <>
                    <h1 className="section-heading">Photos</h1>
                    <div>
                      <Button variant="info">+ add photos</Button>
                      <Link to={`/bookclubs/${props.bookclub.id}/photos`}>
                        view all
                      </Link>
                    </div>
                    {/* <PhotoReel photos={props.bookclub.images} /> */}
                  </>
                ) : (
                  <div id="no-photos">
                    <h3> Remember the good times... </h3>
                    <p>Add club photos here!</p>
                    <Link to={`/bookclubs/${props.bookclub.id}/photos`}>
                      <Button>+ photos</Button>
                    </Link>
                  </div>
                )}
              </section>
            </div>
          </div>
        ) : (
          <LimitedViewClub {...props} club={props.bookclub} />
        )}
        <Footer />
      </div>
    );
  } else {
    return null;
  }
};
const mapDispatch = (dispatch) => {
  return {
    fetchClub: (clubId) => dispatch(fetchClub(clubId)),
    setAuth: () => dispatch(setAuth()),
  };
};

export const BookClub = connect((state) => state, mapDispatch)(_BookClub);
