import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import PrivateNav from '../components/Nav/PrivateNav'
import ProfileMatches from '../components/ProfileMatches'
import ProfileConnections from '../components/Profile/ProfileConnections'
import PollContainer from '../components/Profile/PollContainer'
import DiscussionInterests from '../components/Profile/DiscussionInterests'
import ActivityInterests from '../components/Profile/ActivityInterests'
import FavoritePlaces from '../components/Profile/FavoritePlaces'
import { status, json, getUserInfo } from '../helpers'


function updateUserInfo(props) {
  var requestData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  requestData.interests = props.state.profile.data.interests
  requestData.places = props.state.profile.data.places
  fetch('/app/users/update', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        })
    .then(status)
    .then(props.actions.editUserInfo)
    .catch(function(error) {
      console.log('Request failed', error);
    });
}


class ProfileUserPicture extends Component {
  render() {
    return (
      <div className="personal-info-card-picture">
        <img src={this.props.state.profile.data.picture} />
      </div>
    );
  }
}

class ProfileUserInfoBox extends Component {
  render() {
    return (
      <div className="personal-info-card-userdata">
        <h4>{this.props.state.profile.data.firstName} {this.props.state.profile.data.lastName}</h4>
        <ActivityInterests state={this.props.state} actions={this.props.actions} />
        <DiscussionInterests state={this.props.state} actions={this.props.actions} />
        <FavoritePlaces state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

class ProfileUserData extends Component {
  render() {
    var editUserInfoButton;
    if (!this.props.state.profile.editUserInfo) {
      var editUserInfoButton = <i onClick={this.props.actions.editUserInfo} className="edit-user-info fa fa-cog"></i>
    } else {
      var editUserInfoButton = <button onClick={() => updateUserInfo(this.props)} className="edit-user-info save-button">Save Info</button>
    }
    return (
      <div className="personal-info-card">
        <ProfileUserPicture state={this.props.state} actions={this.props.actions} />
        <ProfileUserInfoBox state={this.props.state} actions={this.props.actions} />
        {editUserInfoButton}
      </div>
    )
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
    if (!this.props.state.profile.data) return <h1><i>Loading profile...</i></h1>
    const { state, actions } = this.props
    return (
      <div>
        <PrivateNav state={this.props.state} actions={this.props.actions} />
        <ProfileUserData state={this.props.state} actions={this.props.actions} />
        <PollContainer state={this.props.state} actions={this.props.actions} />
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
