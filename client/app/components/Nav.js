import React, { Component, PropTypes } from 'react'
const { Link } = require('react-router');

class Nav extends Component {
  render() {
    const { state, actions } = this.props

    var logOutLink = <span onClick={this.props.actions.logOut}>Log Out</span>

    return (
      <nav>
        <li className='nav-left'></li>
        <li className='nav-right'>
          {logOutLink}
        </li>
        <li className='nav-middle'>Good Enough</li>
      </nav>
    )
  }
}

Nav.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Nav
