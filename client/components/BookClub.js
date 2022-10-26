import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchClub } from '../redux/bookclub';
import DatePicker from 'react-datepicker';
import { setAuth } from '../redux/auth';
import { CreateInvite } from './CreateInvite';
import { LimitedViewClub } from './LimitedViewClub';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchBookData } from '../redux/books';
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
  Nav,
} from './index';
import '../../public/css/BookClub.css';
import { Button, Modal, Toast, Col } from 'react-bootstrap';

const _BookClub = (props) => {
  const clubId = props.match.params.id;
  const isMember = (props) => {
    return props.bookclub.members.find((member) => member.id === props.auth.id);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [showInvite, setShowInvite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleClose = () => {
    setShowInvite(false);
  };
  useEffect(() => {
    props.fetchClub(props.match.params.id * 1);
    props.fetchBookData(props.match.params.id, false);
  }, [props.match.params.id]);

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
  if (props.bookclub.id) {
    //   const current = props.bookclub.books
    //     ? props.bookclub.books.find((book) => book.isCurrent === true)
    //     : undefined;

    return (
      <>
        <Nav {...props} />
        <div id="bookclub">
          {hasAccess() && (
            <div id="banner-wrapper">
              <Banner />
            </div>
          )}
          {hasAccess() ? (
            <div className="flex-container">
              <Sidebar {...props} />
              <div id="right">
                <div id="club-details">
                  <h2>
                    Next Meet-Up Date:{' '}
                    <span className="date">{props.bookclub.meetDate}</span>
                  </h2>

                  {isMember ? (
                    <div className="date-picker">
                      <span>
                        <strong>Edit Date:</strong>{' '}
                      </span>
                      <DatePicker
                        portalId="root-portal"
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mmaa"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      <Button onClick={(e) => saveDate(e)}>Confirm</Button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {isMember ? (
                  <div>
                    <Button
                      className="main-top"
                      onClick={() => setShowInvite(true)}
                    >
                      INVITE A MEMBER
                    </Button>
                    <Link
                      to={`/bookclubs/${props.match.params.id}/suggestions/search`}
                    >
                      <Button className="main-top">ADD A BOOK</Button>
                    </Link>

                    <Col>
                      <Toast
                        id="toast"
                        autohide
                        duration={1500}
                        className="rounded mr-2"
                        onClose={() => setShowToast(false)}
                        show={showToast}
                      >
                        <Toast.Header
                          style={{ background: 'green', color: 'white' }}
                        >
                          Success
                        </Toast.Header>
                        <Toast.Body>Invite sent successfully!</Toast.Body>
                      </Toast>
                    </Col>
                    <Modal show={showInvite} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Invite a member</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <CreateInvite
                          showToast={() => setShowToast(true)}
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
                <section id="current-selection">
                  {!props.bookclub.books.find(
                    (book) => book.isCurrent === true
                  ) ? (
                    <div id="no-current">
                      <div>
                        <h3>Currently reading a book? </h3>
                        <p>Find it and select it as your current book</p>

                        <Link
                          to={`/bookclubs/${props.bookclub.id}/suggestions/search`}
                        >
                          <Button className="blue">Find a book</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="header current">
                        <h1 className="section-heading">Current Selection</h1>
                        <Link
                          to={`/bookclubs/${props.match.params.id}/suggestions/search`}
                        >
                          update current selection
                        </Link>
                      </div>
                      <SingleBook
                        {...props}
                        clubView={true}
                        bookId={
                          props.bookclub.books.find(
                            (book) => book.isCurrent === true
                          ).id
                        }
                        current={true}
                      />
                    </div>
                  )}
                  {/* {isMember ? <Link>add feedback</Link> : ''} */}
                </section>
                <section id="suggestions">
                  {props.bookclub.suggestions.length ? (
                    <>
                      <div className="header flex-row">
                        <h1 className="section-heading">Suggestions</h1>
                        <Link
                          to={`/bookclubs/${props.bookclub.id}/suggestions/search`}
                        >
                          <Button className="blue">+ add a book</Button>
                        </Link>
                      </div>
                      {/* <h4>Books added by members for consideration</h4> */}

                      <Suggestions {...props} />
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
                          <Button className="blue">Find a book</Button>
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
                      <div className="header">
                        <h1 className="section-heading">Past Selections</h1>
                        <Link
                          to={`/bookclubs/${props.bookclub.id}/feedback/add`}
                        >
                          rate/review past selections
                        </Link>
                        <Link to={`/bookclubs/${props.bookclub.id}/books`}>
                          view all
                        </Link>
                      </div>
                      <BookList past={true} clubId={props.bookclub.id} />
                    </>
                  ) : (
                    <div id="no-past-books">
                      <div>
                        <h3>Track Your Progress</h3>

                        <p>
                          Add your club's completed books, and share your
                          thoughts on each one...
                        </p>
                        <Link
                          to={`/bookclubs/${props.bookclub.id}/suggestions/search`}
                        >
                          <Button className="blue">Find a book</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </section>
                <section id="photos">
                  {props.bookclub.images.length ? (
                    <>
                      <div className="header">
                        <h1 className="section-heading">Photos</h1>

                        <Link to={`/bookclubs/${props.bookclub.id}/photos`}>
                          view all
                        </Link>
                        <Button className="blue">+ add photos</Button>
                      </div>

                      <PhotoReel photos={props.bookclub.images} />
                    </>
                  ) : (
                    <div id="no-photos">
                      <div>
                        <h3> Remember the good times... </h3>
                        <p>Add club photos here!</p>
                        <Link to={`/bookclubs/${props.bookclub.id}/photos`}>
                          <Button className="blue">+ photos</Button>
                        </Link>
                      </div>
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
      </>
    );
  } else {
    return null;
  }
};
const mapDispatch = (dispatch) => {
  return {
    fetchClub: (clubId) => dispatch(fetchClub(clubId)),
    setAuth: () => dispatch(setAuth()),
    fetchBookData: (id, past) => dispatch(fetchBookData(id, past)),
  };
};

export const BookClub = connect((state) => state, mapDispatch)(_BookClub);
