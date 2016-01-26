import React, { Component, PropTypes } from 'react';
const { Link } = require('react-router');

class UsernamePasswordResetForm extends Component {
  render() {
    return (
      <div>
        HELO?
      </div>
    )
  }
}

UsernamePasswordResetForm.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default UsernamePasswordResetForm;
