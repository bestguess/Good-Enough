import React, { Component, PropTypes } from 'react'
import MatchRating from './MatchRating'
import MatchBoxHover from './Profile/MatchBoxHover'
import TempBoxHover from './Profile/TempBoxHover'
import ConnectionBoxHover from './Profile/ConnectionBoxHover'
import { Link } from 'react-router'

class ProfilePageMatchBoxImage extends Component {
  render() {
    const conversationURL = '/' + this.props.data.id
    var boxHover;
    if (this.props.data.connected) {
      boxHover = <Link to={conversationURL}><ConnectionBoxHover actions={this.props.actions} data={this.props.data} /></Link>
    } else if (this.props.data.requested) {
      boxHover = <TempBoxHover actions={this.props.actions} data={this.props.data} />
    } else {
      boxHover = <MatchBoxHover actions={this.props.actions} data={this.props.data} />
    }
    return (
      <div className="profile-page-match-image">
        <MatchRating rating={this.props.data.score}/>
        {boxHover}
        <img src={this.props.data.picture} />
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
// <Link to={conversationURL}><button>Conversation</button></Link>

ProfilePageMatchBox.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfilePageMatchBox
