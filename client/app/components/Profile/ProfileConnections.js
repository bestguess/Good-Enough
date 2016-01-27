import React, { Component, PropTypes } from 'react'
import ProfilePageMatchBox from '../ProfilePageMatchBox'

class ProfileConnections extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div className="profile-page-connections">
        <div className="connections-header">Connnections</div>
        <div>
          {this.props.temp.map(temp =>
            <ProfilePageMatchBox key={temp.id} data={temp} state={this.props.state} actions={this.props.actions} />
          )}
          {this.props.connections.map(connection =>
            <ProfilePageMatchBox key={connection.id} data={connection} state={this.props.state} actions={this.props.actions} />
          )}
        </div>
      </div>
    );
  }
}

ProfileConnections.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfileConnections