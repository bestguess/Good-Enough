import React, { Component, PropTypes } from 'react'
import ProfileUserInfoBox from './ProfileUserInfoBox'
import ProfileUserPicture from './ProfileUserPicture'
import { status, json, getUserInfo } from '../../helpers'

function updateUserInfo(props) {
  var requestData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  requestData.interests = props.state.profile.data.interests
  requestData.places = props.state.profile.data.places
  console.log(requestData)
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

ProfileUserData.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfileUserData
