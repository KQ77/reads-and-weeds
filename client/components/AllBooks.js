import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBookInfo } from '../redux/pastBooks';

const _AllBooks = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.fetchBookInfo(props.match.params.id);
    }
    return () => (mounted = false);
  }, []);
  return <div id="all-books"></div>;
};

const mapDispatch = (dispatch) => {
  return {
    fetchBookInfo: (id) => dispatch(fetchBookInfo(id)),
  };
};

export const AllBooks = connect((state) => state, mapDispatch)(_AllBooks);
