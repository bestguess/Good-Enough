import React, { Component, PropTypes } from 'react'
import DiscussionInterests from './DiscussionInterests'
import ActivityInterests from './ActivityInterests'
import FavoritePlaces from './FavoritePlaces'

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

ProfileUserInfoBox.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfileUserInfoBox