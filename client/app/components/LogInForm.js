import React, { Component, PropTypes } from 'react'

const { Link } = require('react-router');

class LogInForm extends Component {

  handleKeyUp(input) {
    this.props.actions.saveLogInInput(input, this.refs[input].value)
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      this.props.actions.logIn()
    }
  }

  render() {
    var loginErr;
    var formButton = <button onClick={this.props.actions.logIn} className="question-form-button">Submit</button>

    if (this.props.state.login.loggedStatus) {
      formButton = <button onClick={this.props.actions.logIn} className="question-form-button normal">Submit</button>
    } else {
      formButton = <button onClick={this.props.actions.logIn} className="question-form-button login-error invalid">Invalid Username/Password</button>
    }

    return (
      <div className="login-box">
        <h1 className="login-logo">Login</h1>
        <div className="login-form">
          <input placeholder="Enter Email" ref="email" onKeyUp={() => this.handleKeyUp('email')} onKeyPress={(event) => this.handleKeyPress(event)}  />
          <input type="password" placeholder="Enter Password" ref="password" onKeyUp={() => this.handleKeyUp('password')} onKeyPress={(event) => this.handleKeyPress(event)} />
        </div>
        <div className="question-form-submit-button-login">
          {formButton}
        </div>
        <div className="forgot-username-password">
          <Link to="/recover-password" className="forgot-username-password">Forgot password</Link>
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



