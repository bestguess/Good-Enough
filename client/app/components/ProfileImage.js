import React, { Component, PropTypes } from 'react'

class ProfileImage extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div className="profile-page-picture">
        <img src={this.props.state.profile.data.picture} />
      </div>
    )
  }
}

ProfileImage.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfileImage