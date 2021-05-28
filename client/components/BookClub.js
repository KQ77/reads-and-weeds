import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClub } from '../redux/bookclub';
import DatePicker from 'react-datepicker';

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
import { Button } from 'react-bootstrap';

const _BookClub = (props) => {
  const clubId = props.match.params.id;
  const isMember = (props) => {
    return props.bookclub.members.find((member) => member.id === props.auth.id);
  };
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    props.fetchClub(props.match.params.id * 1);
  }, []);

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
  if (props.bookclub.name) {
    const current = props.bookclub.books.find((book) => book.isCurrent);
    // const pastBooks = props.bookclub.books.filter((book) => !book.isCurrent);
    return (
      <div id="bookclub">
        <Burger {...props} />
        <Banner />
        <div className="flex-container">
          <Sidebar />
          <div id="right">
            <div>
              <h2>Next Meet-Up Date: {props.bookclub.meetDate}</h2>
              {isMember ? (
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
              ) : (
                ''
              )}
            </div>
            <section id="current-selection">
              <h1 className="section-heading">Current Selection</h1>
              {/* <SingleBook landing={true} bookId={current.id} /> */}
              {/* {isMember ? <Link>add feedback</Link> : ''} */}
            </section>
            <section id="suggestions">
              <div className="flex-row">
                <h1 className="section-heading">Suggestions</h1>
                <h2>Books added by members for consideration</h2>
                <Link to={`/bookclubs/${props.bookclub.id}/suggestions/search`}>
                  <Button variant="info">+ add a book</Button>
                </Link>
              </div>
              {/* <Suggestions /> */}
            </section>
            <section id="past-selections">
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
            </section>
            <section id="photos">
              {/* link to see all photos /bookclubs/:id/photos; other link maybe opens a modal - to form that adds photos */}
              <h1 className="section-heading">Photos</h1>
              <div>
                <Button variant="info">+ add photos</Button>
                <Link to={`/bookclubs/${props.bookclub.id}/photos`}>
                  view all
                </Link>
              </div>
              {/* <PhotoReel photos={props.bookclub.images} /> */}
            </section>
          </div>
        </div>
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
  };
};

export const BookClub = connect((state) => state, mapDispatch)(_BookClub);
