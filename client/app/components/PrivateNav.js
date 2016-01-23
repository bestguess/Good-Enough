import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PrivateNav extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <nav className="private-nav">
        <li className='nav-left'>
          <Link to="/profile">{this.props.state.profile.data.firstName} {this.props.state.profile.data.lastName}</Link>
        </li>
        <li className='nav-right'>
          <Link to="/"><span onClick={this.props.actions.logout}>Log Out</span></Link>
        </li>
        <li className='nav-middle'>
          <Link to="/profile" style={{fontWeight: '800'}}>Good Enough</Link>
        </li>
      </nav>
    )
  }
}

PrivateNav.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PrivateNav
