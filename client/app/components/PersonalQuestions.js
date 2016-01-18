import React, { Component, PropTypes } from 'react'

class PersonalQuestions extends Component {

  handleKeyUp(input) {
    this.props.actions.saveInput(input, this.refs[input].value)
  }

  render() {
    return (
        <div className="user-info-form">
          <input placeholder="Email" ref="email" onKeyUp={() => this.handleKeyUp('email')} />
          <input placeholder="Password" ref="password" onKeyUp={() => this.handleKeyUp('password')} />
          <input placeholder="First Name" ref="firstname" onKeyUp={() => this.handleKeyUp('firstname')} />
          <input placeholder="Last Name" ref="lastname" onKeyUp={() => this.handleKeyUp('lastname')} />
        </div>
      )
  }
}

PersonalQuestions.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PersonalQuestions