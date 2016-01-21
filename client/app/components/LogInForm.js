import React, { Component, PropTypes } from 'react'
const { Link } = require('react-router');

class LogInForm extends Component {

  handleKeyUp(input) {
    this.props.actions.saveLogInInput(input, this.refs[input].value)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log("entered");
      this.props.actions.logIn
    }
  }

  render() {
    var formButton = <button onClick={this.props.actions.logIn} className="question-form-button">Submit</button>

    return (
      <form>
      <div className="login-box">
        <h1 className="login-logo">Login</h1>
        <div className="login-form">
          <input placeholder="Enter Email" ref="email" onKeyUp={() => this.handleKeyUp('email')} onKeyPress = {this.handleKeyPress}/>
          <input type="password" placeholder="Enter Password" ref="password" onKeyUp={() => this.handleKeyUp('password')} onKeyPress = {this.handleKeyPress}/>
        </div>
        <div className="question-form-submit-button">
          {formButton}
        </div>
      </div>
      </form>
      )
  }
}

LogInForm.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default LogInForm



