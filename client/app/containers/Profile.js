import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import PrivateNav from '../components/Nav/PrivateNav'
import ProfileMatches from '../components/ProfileMatches'
import { status, json, getUserInfo } from '../helpers'

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



class ProfileUserPicture extends Component {
  render() {
    return (
      <div className="personal-info-card-picture">
        <img src={this.props.state.profile.data.picture} />
      </div>
    );
  }
}

class DiscussionInterests extends Component {

  deleteInput(topic) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('discussion', topic)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="topic" onKeyPress={(event) => this.handleKeyPress(event)} placeholder="add topic..."/>
    return (
      <div className="user-interest-container">
        <span>Likes to talk about: </span>
        {this.props.state.profile.data.interests.discussion.map(topic =>
            <span key={topic} className="user-interest discussion" onClick={() => this.deleteInput(topic)}>{topic}</span>
        )}
        {editInput}
      </div>
    );
  }
}

class ActivityInterests extends Component {

  deleteInput(activity) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('activity', activity)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="activity" onKeyPress={(event) => this.handleKeyPress(event)} placeholder="add activity..."/>
    return (
      <div className="user-interest-container">
        <span>Likes to do: </span>
        {this.props.state.profile.data.interests.activity.map(activity =>
            <span key={activity} className="user-interest activity" onClick={() => this.deleteInput(activity)}>{activity}</span>
        )}
        {editInput}
      </div>
    );
  }
}

class FavoritePlaces extends Component {

  deleteInput(place) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('place', place)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="place" onKeyPress={(event) => this.handleKeyPress(event)} placeholder="add place..."/>
    return (
      <div className="user-interest-container">
        <span>Favorite Places: </span>
        {this.props.state.profile.data.places.map(place =>
            <span key={place} className="user-interest place" onClick={() => this.deleteInput(place)}>{place}</span>
        )}
        {editInput}
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
      var editUserInfoButton = <button onClick={this.props.actions.editUserInfo} className="edit-user-info save-button">Save Info</button>
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

class PollContainer extends Component {
  render() {
    return (
      <div className="poll-container-card">
        Poll goes here
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
