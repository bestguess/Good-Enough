import React, { Component, PropTypes } from 'react'
const { Link } = require('react-router');

class PrivateNav extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <nav className="private-nav">
        <li className='nav-left'></li>
        <li className='nav-right'>
          <Link to="/"><span onClick={this.props.actions.logout}>Log Out</span></Link>
        </li>
        <li className='nav-middle'>Good Enough</li>
      </nav>
    )
  }
}

PrivateNav.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PrivateNav