// const React = require('react');

// module.exports = function LogIn() {
//   return <div>LogIn Here</div>;
// }


import React, { Component, PropTypes } from 'react'

class LogIn extends Component {
  render() {
    return (
      <div>LogIn Here</div>
    )
  }
};

LogIn.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default LogIn
