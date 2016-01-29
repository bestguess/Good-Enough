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
      img = <div className="img-connection"><div className="img-holder"><img className="match-image" src={this.props.data.picture} /></div></div>
    } else if (this.props.data.requested) {
      boxHover = <TempBoxHover actions={this.props.actions} data={this.props.data} />
      img = <div className="img-pending-connection"><div className="img-holder"><img className="match-image" src={this.props.data.picture} /></div></div>
    } else {
      boxHover = <MatchBoxHover actions={this.props.actions} data={this.props.data} />
      img = <div className="img-match"><div className="img-holder"><img className="match-image" src={this.props.data.picture} /></div></div>
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
