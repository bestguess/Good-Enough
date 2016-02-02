import React, { Component, PropTypes } from 'react';
const { Link } = require('react-router');

class NewPasswordForm extends Component {
  handleKeyUpNewPassword(input) {
    console.log('input YO: ', this.refs[input].value)
    this.props.actions.saveNewPasswordInput(input, this.refs[input].value)
  }

  handleKeyUpConfirmNewPassword(input) {
    console.log('input YO: ', this.refs[input].value)
    this.props.actions.saveConfirmNewPasswordInput(input, this.refs[input].value)
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      this.props.actions.submitNewPassword()
    }
  }

  render() {
    var thisComp = this.props.state.usernamePasswordReset.userData;
    var passwordCheck;
    var newPasswordReceived;
    var formButton;
    var spinner;

    if (thisComp.newPasswordReceived) {
      return (
        <div className="login-box password-reset">
          <h1 className="login-logo password-reset">Success! You're password has been reset.</h1>
          <span>If you are not redirected in 5 seconds, please click <Link to='/logIn'>here</Link></span>
        </div>
      )
    }

    if (thisComp.isFetching) {
      return (
        <div className="login-box password-reset">
          <h1 className="login-logo password-reset">Reseting your password...</h1>
        </div>
      )
    }

    if (thisComp.emailReceived) {
      newPasswordReceived = <span className="recover-password-email-success">An email has been sent to {thisComp.email} with instructions to reset password</span>
    }

    if (thisComp.newPassword === thisComp.confirmNewPassword) {
      passwordCheck = <span className="passwordCheck"></span>;
      formButton = <button onClick={this.props.actions.submitNewPassword} className="question-form-button valid">Submit</button>
    } else {
      formButton = <button className="question-form-button invalid">Submit</button>
      passwordCheck = <span className="passwordCheck">Passwords do not match</span>
    }

    return (
      <div className="login-box">
        <h1 className="login-logo password-reset">Reset your password</h1>
        <div className="login-form">
        {newPasswordReceived}
        <div>
          <input type="password" className="recover-password-email" placeholder="Enter new password" ref="newPassword" onKeyUp={() => this.handleKeyUpNewPassword('newPassword')} onKeyPress={(event) => this.handleKeyPress(event)} />
          <input type="password" className="recover-password-email" placeholder="Confirm new password" ref="confirmNewPassword" onKeyUp={() => this.handleKeyUpConfirmNewPassword('confirmNewPassword')} onKeyPress={(event) => this.handleKeyPress(event)} />
          </div>
        {passwordCheck}
        </div>
        <div className="question-form-submit-button-login">
          {formButton}
        </div>
      </div>
    )
  }
}

NewPasswordForm.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default NewPasswordForm;
