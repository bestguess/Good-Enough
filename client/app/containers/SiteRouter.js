import React from 'react'
import { Link } from 'react-router'
const { connect } = require('react-redux');
const { routeActions } = require('redux-simple-router');

function SiteRouter({ push, children }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

module.exports = connect(
  null,
  { push: routeActions.push }
)(SiteRouter);
