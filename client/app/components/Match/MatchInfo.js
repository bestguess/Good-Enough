import React, { Component, PropTypes } from 'react'
import MatchPicture from './MatchPicture'
import MatchUserData from './MatchUserData'

class MatchInfo extends Component {
  render() {
    return (
      <div className="personal-info-card">
        <MatchPicture state={this.props.state} actions={this.props.actions} />
        <MatchUserData state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

MatchInfo.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchInfo
