import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class PrivateNav extends Component {
  render() {
    const { state, actions } = this.props
    var mobileBackButton;
    if (window.location.pathname !== '/profile') mobileBackButton = <Link to="/profile" className="mobile-nav"><i className="fa fa-angle-double-left"></i></Link>
    return (
      <nav className="private-nav">
        <li className='nav-left'>
          {mobileBackButton}
          <Link to="/profile" className="desktop-nav">{this.props.state.profile.data.firstName} {this.props.state.profile.data.lastName}</Link>
        </li>
        <li className='nav-right'>
          <Link to="/" className="desktop-nav"><span onClick={this.props.actions.logout}>Log Out</span></Link>
          <Link to="/" className="mobile-nav"><i onClick={this.props.actions.logout} className="fa fa-sign-out"></i></Link>
        </li>
        <li className='nav-middle title'>
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
