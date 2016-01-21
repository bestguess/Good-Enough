import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class ProfilePageMatchBox extends Component {
  render() {
    const { state, actions, data, key } = this.props
    var connectButton = <button onClick={() => {this.props.actions.connect(this.props.data)}}>Connect!</button>
    const conversationURL = '/' + this.props.data[0]

    return (
      <div className="profile-page-match">
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
