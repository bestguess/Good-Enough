import React, { Component, PropTypes } from 'react'

class MatchPicture extends Component {
  render() {
    return (
      <div className="personal-info-card-picture">
        <img src={this.props.state.match.data.picture} />
      </div>
    );
  }
}

MatchPicture.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchPicture
