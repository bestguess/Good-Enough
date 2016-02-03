import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { demoLogin } from '../../helpers'

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
        <li className='nav-left'><button className="demo-left" onClick={() => demoLogin(this.props)}><i className="fa fa-desktop demo-icon"></i>Demo</button></li>
        <li className='nav-right'>{button}</li>
        <li className='nav-middle'>
        <button className="demo-button" onClick={() => demoLogin(this.props)}><i className="fa fa-desktop demo-icon"></i>Demo</button>
        <a href="https://github.com/bestguess/Good-Enough"><button className="demo-button github"><i className="fa fa-github demo-icon"></i>Github</button></a>
        </li>
      </nav>
    )
  }
}

PublicNav.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PublicNav
