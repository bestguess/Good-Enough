import React, { Component, PropTypes } from 'react'
import { status, json } from '../../helpers'

class ConnectionBoxHover extends Component {
  render() {
    return (
        <div className="connection-box-hover">
        	<p className="match-box-name">{this.props.data.firstName} {this.props.data.lastName}</p>
          <span>Talk</span>
        </div>
      )
  }
}

ConnectionBoxHover.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ConnectionBoxHover