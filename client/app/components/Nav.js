import React, { Component, PropTypes } from 'react'
const { Link } = require('react-router');

class Nav extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <nav>
        <span>Good Enough</span>
        <Link to="/"><span className="nav-logout" onClick={this.props.actions.logout}>Log Out</span></Link>
      </nav>
    )
  }
}

Nav.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Nav