import React, { Component, PropTypes } from 'react'

class PollContainer extends Component {
  render() {
    return (
      <div className="poll-container-card">
        Poll goes here
      </div>
    )
  }
}

PollContainer.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PollContainer