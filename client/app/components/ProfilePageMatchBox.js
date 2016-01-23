import React, { Component, PropTypes } from 'react'
import MatchRating from './MatchRating'
import MatchBoxHover from './MatchBoxHover'
import { Link } from 'react-router'

class ProfilePageMatchBoxImage extends Component {
  render() {
    return (
      <div className="profile-page-match-image">
        <MatchRating rating={this.props.data[1]}/>
        <MatchBoxHover />
        <img src={this.props.data[4]} />
      </div>
    )
  }
}


class ProfilePageMatchBox extends Component {
  render() {

    var connectButton = <button className="connect" onClick={() => {this.props.actions.connect(this.props.data)}}>Connect!</button>
    const conversationURL = '/' + this.props.data[0]

    return (
      <div className="profile-page-match">
        <ProfilePageMatchBoxImage state={this.props.state} actions={this.props.actions} data={this.props.data} />
        <h4>{this.props.data[2]} {this.props.data[3]}</h4>
        <p>{this.props.data[5]} years old</p>
        {connectButton}
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
