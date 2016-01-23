import React, { Component, PropTypes } from 'react'

class MatchBoxHover extends Component {
  render() {
    return (
        <div className="match-box-hover">
        	<p className="match-box-name">{this.props.data[2]} {this.props.data[3]}</p>
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