import React, { Component, PropTypes } from 'react'
import MatchRating from './MatchRating'
import MessageNotifications from './Profile/MessageNotifications'
import NewConnectionAlert from './Profile/NewConnectionAlert'
import MatchBoxHover from './Profile/MatchBoxHover'
import TempBoxHover from './Profile/TempBoxHover'
import ConnectionBoxHover from './Profile/ConnectionBoxHover'
import { Link } from 'react-router'

class ProfilePageMatchBoxImage extends Component {
  render() {
    const conversationURL = '/' + this.props.data.id
    var boxHover;
    var img;
    if (this.props.data.connected) {
      boxHover = <Link to={conversationURL}><ConnectionBoxHover actions={this.props.actions} data={this.props.data} /></Link>
      img = <div className="img-connection"><div className="img-holder"><img className="match-image" src={this.props.data.picture} /></div></div>
    } else if (this.props.data.requested) {
      boxHover = <TempBoxHover actions={this.props.actions} data={this.props.data} />
      img = <div className="img-pending-connection"><div className="img-holder"><img className="match-image" src={this.props.data.picture} /></div></div>
    } else {
      boxHover = <MatchBoxHover actions={this.props.actions} data={this.props.data} />
      img = <div className="img-match"><div className="img-holder"><img className="match-image" src={this.props.data.picture} /></div></div>
    }
    var messageNotifications;
    if (this.props.data.messages && Object.keys(this.props.data.messages).length > 0) {
      messageNotifications = <MessageNotifications data={this.props.data.messages}/>
    } else {
      messageNotifications = <MatchRating rating={this.props.data.score}/>
    }
    var newConnectionAlert;
    if (this.props.data.accepted) newConnectionAlert = <NewConnectionAlert />
    return (
      <div className="profile-page-match-image">
        {newConnectionAlert}
        {messageNotifications}
        {boxHover}
        {img}
      </div>
    )
  }
}

class ProfilePageMatchBox extends Component {
  render() {
    return (
      <div className="profile-page-match">
        <ProfilePageMatchBoxImage state={this.props.state} actions={this.props.actions} data={this.props.data} />
      </div>
    )
  }
}

ProfilePageMatchBox.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfilePageMatchBox
