import React, { Component, PropTypes } from 'react'

class MatchBoxHover extends Component {
  render() {
    return (
        <div className="match-box-hover">
          <span>Connect</span>
        </div>
      )
  }
}

MatchBoxHover.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchBoxHover