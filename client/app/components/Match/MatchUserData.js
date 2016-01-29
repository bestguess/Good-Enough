import React, { Component, PropTypes } from 'react'
import ActivityInterests from './ActivityInterests'
import DiscussionInterests from './DiscussionInterests'
import FavoritePlaces from './FavoritePlaces'

class MatchUserData extends Component {
  render() {
    return (
      <div className="personal-info-card-userdata">
        <h4>{this.props.state.match.data.firstName} {this.props.state.match.data.lastName}</h4>
        <ActivityInterests state={this.props.state} actions={this.props.actions} />
        <DiscussionInterests state={this.props.state} actions={this.props.actions} />
        <FavoritePlaces state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

MatchUserData.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchUserData
