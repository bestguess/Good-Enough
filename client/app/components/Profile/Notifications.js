import React, { Component, PropTypes } from 'react'

class Notifications extends Component {
  render() {
  	var count
  	if (this.props.data) count = Object.keys(this.props.data).length
    return (
      <div>
        <div className="notification-count">{count}</div>
        <div className="notification">
        	<i className="fa fa-envelope-o"></i>
        </div>
      </div>
      )
  }
}

Notifications.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Notifications
