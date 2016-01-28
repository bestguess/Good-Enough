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
    var img;
    if (this.props.data.connected) {
      boxHover = <Link to={conversationURL}><ConnectionBoxHover actions={this.props.actions} data={this.props.data} /></Link>
      img = <img className="img-connection" src={this.props.data.picture} />
    } else if (this.props.data.requested) {
      boxHover = <TempBoxHover actions={this.props.actions} data={this.props.data} />
      img = <img className="img-pending-connection" src={this.props.data.picture} />
    } else {
      boxHover = <MatchBoxHover actions={this.props.actions} data={this.props.data} />
      img = <img className="img-match" src={this.props.data.picture} />
    }
    return (
      <div className="profile-page-match-image">
        <MatchRating rating={this.props.data.score}/>
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
