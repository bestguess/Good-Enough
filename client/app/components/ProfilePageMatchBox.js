import React, { Component, PropTypes } from 'react'
import MatchRating from './MatchRating'
import MatchBoxHover from './MatchBoxHover'
import { Link } from 'react-router'

class ProfilePageMatchBoxImage extends Component {
  render() {
    return (
      <div className="profile-page-match-image">
        <MatchRating rating={this.props.data.score}/>
        <MatchBoxHover actions={this.props.actions} data={this.props.data} />
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
        <Link to={conversationURL}><button>Conversation</button></Link>
      </div>
    )
  }
}

ProfilePageMatchBox.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProfilePageMatchBox
