import React, { Component, PropTypes } from 'react'

class LogInForm extends Component {

  handleKeyUp(input) {
    this.props.actions.saveLogInInput(input, this.refs[input].value)
  }

  render() {
    var formButton = <button onClick={this.props.actions.logIn} className="question-form-button">Submit</button>

    return (
      <div>
        <h1 className="logo">Login</h1>
        <div className="user-info-form">
          <input placeholder="Enter Email" ref="email" onKeyUp={() => this.handleKeyUp('email')} />
          <input placeholder="Enter Password" ref="password" onKeyUp={() => this.handleKeyUp('password')} />
        </div>
        <div className="question-form-submit-button">
          {formButton}
        </div>
      </div>
      )
  }
}

LogInForm.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default LogInForm



