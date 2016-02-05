import React, { Component, PropTypes } from 'react'

class ProfileUserPicture extends Component {
  render() {
    return (
      <div className="personal-info-card-picture">
        <img className="img-full" src={this.props.state.profile.data.picture} />
      </div>
    );
  }
}

ProfileUserPicture.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfileUserPicture
