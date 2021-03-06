import React, { Component, PropTypes } from 'react';
const { Link } = require('react-router');

class UsernamePasswordResetForm extends Component {


  handleKeyUp(input) {
    this.props.actions.saveRecoverPasswordInput(input, this.refs[input].value)
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      this.props.actions.recoverPassword()
    }
  }

  render() {
    var currState = this.props.state.usernamePasswordReset.userData;
    var formButton = <button onClick={this.props.actions.recoverPassword} className="question-form-button normal">Submit</button>;
    var spinner;
    var status;

    // If fetching, let the user know we're checking the email.
    if (currState.isFetching) {
      status = <span className="recover-password-email-error"></span>;
      formButton = <button onClick={this.props.actions.recoverPassword} className="question-form-button">Checking this email account...</button>
    } else {
      spinner = <span className="recover-password-email-error"></span>;
      // If no email found, notify the user.
      if (!currState.foundEmail) {
        status = <span className="recover-password-email-error"></span>
        formButton = <button onClick={this.props.actions.recoverPassword} className="question-form-button login-error invalid">No account with this email exists</button>
        // If found, notify that the user to check his/her email.
      } else if (currState.emailReceived) {
        return (
          <div className="login-box">
            <span className="recover-password-email-success">An email has been sent to {currState.email} with further instructions.</span>
          </div>
        )
      }
    }

    return (
      <div className="recover-password-box">
        <h1 className="login-logo password-reset">Password Recovery</h1>
        <div className="login-form-recover-password">
          {status}
          {spinner}
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
