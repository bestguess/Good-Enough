import React, { Component, PropTypes } from 'react';
const { Link } = require('react-router');

class UsernamePasswordResetForm extends Component {
  handleKeyUp(input) {
    console.log('input YO: ', this.refs[input].value)
    this.props.actions.saveRecoverPasswordInput(input, this.refs[input].value)
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      this.props.actions.recoverPassword()
    }
  }

  render() {
    var loginErr;
    var emailAlert;

    if (this.props.state.usernamePasswordReset.userData.foundEmail) {
      loginErr = <span className="loginError"></span>;
    } else {
      loginErr = <span className="recover-password-email-error">No account with that email exists</span>
    }

    if (this.props.state.usernamePasswordReset.userData.emailReceived) {
      emailAlert = <span className="recover-password-email-success">An email has been sent to {this.props.state.usernamePasswordReset.userData.email} with further instructions</span>
    }

    var formButton = <button onClick={this.props.actions.recoverPassword} className="question-form-button">Submit</button>
    return (
      <div className="login-box">
        <h1 className="login-logo password-reset">Password Recovery</h1>
        <div className="login-form">
        {emailAlert}
        {loginErr}
        <div>
          <input className="recover-password-email" placeholder="Enter Email" ref="email" onKeyUp={() => this.handleKeyUp('email')} onKeyPress={(event) => this.handleKeyPress(event)} />
          </div>
        </div>
        <div className="question-form-submit-button-login">
          {formButton}
        </div>
      </div>
    )
  }
}

UsernamePasswordResetForm.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default UsernamePasswordResetForm;
