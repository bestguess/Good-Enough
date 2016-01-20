import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import LogInForm from '../components/LogInForm'
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

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {    
    this.props.actions.profile()
  }

  render() {
    console.log('rendering: ', this)
    const { state, actions } = this.props
    return (
      <div>
        <Nav state={this.props.state} actions={this.props.actions} />
        <p>Email: {this.props.state.profile.data.email}</p>
        <p>Name: {this.props.state.profile.data.firstName} {this.props.state.profile.data.lastName}</p>
        <p>Gender: {this.props.state.profile.data.gender}</p>
      </div>
    );
  }
};

Profile.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProfileActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
