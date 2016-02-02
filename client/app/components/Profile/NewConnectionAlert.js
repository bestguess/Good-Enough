import React, { Component, PropTypes } from 'react'

class NewConnectionAlert extends Component {
  render() {
    return (
      <div>
        <div className="notification new-connection">
        	<i className="fa fa-check new-connection"></i>
        </div>
      </div>
      )
  }
}

NewConnectionAlert.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default NewConnectionAlert
