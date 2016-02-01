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
    var thisComp = this.props.state.usernamePasswordReset.userData;
    var loginErr;
    var emailAlert;
    var spinner;
    var status;

    thisComp.isFetching ? status = <span>Spinner goes here</span> : status = undefined;
    !thisComp.foundEmail ? status = <span className="recover-password-email-error">No account with that email exists</span>
    : status = undefined;

    if (thisComp.emailReceived) {
      return (
        <div className="login-box">
          <span className="recover-password-email-success">An email has been sent to {thisComp.email} with further instructions</span>
        </div>
      )
    }

    return (
      <div className="login-box">
        <h1 className="login-logo password-reset">Password Recovery</h1>
        <div className='notification-spot-recover-password'>
        <span>
          {status}
          </span>
        </div>
        <div className="login-form">
          <div>
            <input className="recover-password-email" placeholder="Enter Email" ref="email" onKeyUp={() => this.handleKeyUp('email')} onKeyPress={(event) => this.handleKeyPress(event)} />
          </div>
        </div>
        <div className="question-form-submit-button-login">
          <button onClick={this.props.actions.recoverPassword} className="question-form-button">Submit</button>
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
