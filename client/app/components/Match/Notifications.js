import React, { Component, PropTypes } from 'react'

class Notifications extends Component {
  render() {
    var count = Object.keys(this.props.data).length;
    return (
      <div>
        <div className="notification"><span>hank</span></div>
      </div>
      )
  }
}

Notifications.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Notifications
