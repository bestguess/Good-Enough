import React, { Component, PropTypes } from 'react'
import MatchRating from './MatchRating'
import MatchBoxHover from './MatchBoxHover'
import TempBoxHover from './TempBoxHover'
import { Link } from 'react-router'

class ProfilePageMatchBoxImage extends Component {
  render() {
    var boxHover;
    if (this.props.data.requested) {
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
    const conversationURL = '/' + this.props.data.id
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
