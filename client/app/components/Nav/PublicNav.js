import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PublicNav extends Component {
  render() {
    var button;
    if (this.props.state.routing.location.pathname === '/') {
      var button = <Link to="/login">Login</Link>
    } else {
      var button = <Link to="/">Signup</Link>
    }
    const { state, actions } = this.props
    return (
      <nav className="public-nav">
        <li className='nav-left'><button className="demo-button" onClick={this.props.actions.demoUser}>Demo</button></li>
        <li className='nav-right'>{button}</li>
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
