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
    var perc = this.props.data[1];
    var percent;

    if (perc <= 25) {
      percent = <p className="percent-0-25 perc">{perc}%</p>
    } else if (perc >= 26 && perc <= 35) {
      percent = <p className="percent-26-35 perc">{perc}%</p>
    } else if (perc >= 36 && perc <= 45) {
      percent = <p className="percent-36-45 perc">{perc}%</p>
    } else if (perc >= 46 && perc <= 55) {
      percent = <p className="percent-46-55 perc">{perc}%</p>
    } else if (perc >= 56 && perc <= 65) {
      percent = <p className="percent-56-65 perc">{perc}%</p>
    } else if (perc >= 66 && perc <= 75) {
      percent = <p className="percent-66-75 perc">{perc}%</p>
    } else if (perc >= 76 && perc <= 85) {
      percent = <p className="percent-76-85 perc">{perc}%</p>
    } else if (perc >= 86 && perc <= 95) {
      percent = <p className="percent-86-95 perc">{perc}%</p>
    } else if (perc >= 96 && perc <= 100) {
      percent = <p className="percent-96-100 perc">{perc}%</p>
    } else {
      percent = <p>Error</p>
    }

    var connectButton = <button className="connect" onClick={() => {this.props.actions.connect(this.props.data)}}>Connect!</button>
    const conversationURL = '/' + this.props.data[0]

    return (
      <div className="profile-page-match">
        <ProfilePageMatchBoxImage state={this.props.state} actions={this.props.actions} img ={this.props.data[4]} />
        <h4>{this.props.data[2]} {this.props.data[3]}</h4>
        <p>{this.props.data[5]} years old</p>
        {percent}
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
