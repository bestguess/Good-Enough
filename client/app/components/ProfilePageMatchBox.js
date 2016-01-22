import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class ProfilePageMatchBoxImage extends Component {
  render() {
    return (
      <div className="profile-page-match-image">
        <img src={this.props.img} />
      </div>
    )
  } 
}


class ProfilePageMatchBox extends Component {
  render() {
    const { state, actions, data, key } = this.props
    var connectButton = <button onClick={() => {this.props.actions.connect(this.props.data)}}>Connect!</button>
    const conversationURL = '/' + this.props.data[0]

    return (
      <div className="profile-page-match">
        <ProfilePageMatchBoxImage state={this.props.state} actions={this.props.actions} img ={this.props.data[4]} />
        <h4>{this.props.data[2]} {this.props.data[3]}</h4>
        <p>{this.props.data[5]} years old</p>
        <p>{this.props.data[1]}%</p>
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
