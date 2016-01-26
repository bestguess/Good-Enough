import React, { Component, PropTypes } from 'react'

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

ProfileConnections.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfileConnections