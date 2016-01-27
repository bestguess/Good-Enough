import React, { Component, PropTypes } from 'react'
import ProfilePageMatchBox from './ProfilePageMatchBox'

class ProfileMatches extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div className="profile-page-data">
        <div className="connections-header">Matches</div>
        <div className="profile-page-boxes">
          {this.props.matches.map(match =>
            <ProfilePageMatchBox key={match.id} data={match} state={this.props.state} actions={this.props.actions} />
          )}
        </div>
      </div>
    )
  }
}

ProfileMatches.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfileMatches
