import React, { Component, PropTypes } from 'react'

class MatchBoxHover extends Component {
  render() {
    return (
        <div className="match-box-hover" onClick={() => {this.props.actions.connect(this.props.data)}}>
        	<p className="match-box-name">{this.props.data.firstName} {this.props.data.lastName}</p>
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