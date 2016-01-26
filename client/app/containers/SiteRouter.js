import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

function SiteRouter({ push, children }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default connect(
  null,
  { push: routeActions.push }
)(SiteRouter);
