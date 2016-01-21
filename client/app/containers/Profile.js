import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import PrivateNav from '../components/PrivateNav'
import ProfileMatches from '../components/ProfileMatches'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) { return response.json() }

function getUserInfo(props) {
  var userData = window.localStorage.getItem('GoodEnough')
  fetch('http://localhost:4000/app/users/info', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(JSON.parse(userData))
        })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      props.actions.profile(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

class ProfileConnections extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div className="profile-page-connections">
        <span> This is where the profile connections would go</span>
      </div>
    );
  }  
}


class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.actions.profile()
    // getUserInfo(this.props)
  }

  reRoute(props) {
    this.props.history.push({ pathname: '/' })
  }

  render() {
    if (!window.localStorage.getItem('GoodEnough')) this.reRoute(this.props)
    if (!this.props.state.profile.data) {
      return <h1><i>Loading profile...</i></h1>
    }
    const { state, actions } = this.props
    return (
      <div>
        <PrivateNav state={this.props.state} actions={this.props.actions} />
        <ProfileConnections state={this.props.state} actions={this.props.actions} />
        <ProfileMatches state={this.props.state} actions={this.props.actions} />
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
