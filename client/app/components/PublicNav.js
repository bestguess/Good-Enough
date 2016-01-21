import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PublicNav extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <nav className="public-nav">
        <li className='nav-left'></li>
        <li className='nav-right'>
          <Link to="/login">Log In</Link>
        </li>
        <li className='nav-middle'></li>
      </nav>
    )
  }
}

PublicNav.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PublicNav