import React, { Component, PropTypes } from 'react'
import PersonalQuestions from './PersonalQuestions'
import PersonalityTest from './PersonalityTest'
import ProgressBar from './ProgressBar'
import { status, json } from '../helpers'

function submitSurvey(props) {
  const newObj = {};
  var state = props.state.signup

  // Calculate Personality Test results
  var type = "";
  newObj.IE = 30 - state.userData.answers[3] - state.userData.answers[7] - state.userData.answers[11] + state.userData.answers[15] - state.userData.answers[19] + state.userData.answers[23] + state.userData.answers[27] - state.userData.answers[31];
  newObj.SN = 12 + state.userData.answers[4] + state.userData.answers[8] + state.userData.answers[12] + state.userData.answers[16] + state.userData.answers[20] - state.userData.answers[24] - state.userData.answers[28] + state.userData.answers[32];
  newObj.FT = 30 - state.userData.answers[2] + state.userData.answers[6] + state.userData.answers[10] - state.userData.answers[14] - state.userData.answers[18] + state.userData.answers[22] - state.userData.answers[26] - state.userData.answers[30];
  newObj.JP = 18 + state.userData.answers[1] + state.userData.answers[5] - state.userData.answers[9] + state.userData.answers[13] - state.userData.answers[17] + state.userData.answers[21] - state.userData.answers[25] + state.userData.answers[29];
  type += newObj.IE<24 ? "I" : "E";
  type += newObj.SN<24 ? "S" : "N";
  type += newObj.FT<24 ? "F" : "T";
  type += newObj.JP<24 ? "J" : "P";

  // Organize SignUp data to send to server
  var userData = {
    email: state.userData.email.toLowerCase(),
    password: state.userData.password,
    firstName: state.userData.firstname,
    lastName: state.userData.lastname,
    birthday: new Date(state.userData.birthday.year, state.userData.birthday.month, state.userData.birthday.day).getTime(),
    gender: state.userData.gender,
    city: 'Austin',
    interests: state.userData.interests,
    type: type,
    personality:{"ie": newObj.IE,"sn": newObj.SN,"ft": newObj.FT,"jp": newObj.JP},
    picture: state.userData.picture || "http://e27.co/img/no_image_profile.jpg",
    places: state.userData.places,
    matches: []
  }
  console.log('data: ', userData)
  fetch('/app/users/signup', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      props.actions.submitSurvey(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}


class QuestionForm extends Component {

  reRoute() {
    this.props.history.push({ pathname: '/profile' })
  }

  submitUserInfo(props) {
    submitSurvey(props)
  }

  surveyError(props) {
    props.actions.surveyError()
  }

  render() {
    if (window.localStorage.getItem('GoodEnough')) this.reRoute()
    var content;
    var formButton;
    var progressBar;
    if (this.props.state.signup.viewData.signup.stage0) {
      formButton = <button onClick={this.props.actions.continueSurvey} className="start-test">Get Started</button>
    } else if (this.props.state.signup.viewData.signup.stage1) {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalityTest state={this.props.state} actions={this.props.actions} />
      if (this.props.state.signup.validationChecks.stage1) {
        formButton = <button onClick={this.props.actions.continueSurvey} className="question-form-button normal valid">Continue</button>
      } else if (this.props.state.signup.validationChecks.stage1error) {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid signup-error">Please Answer All Questions</button>
      } else {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid">Continue</button>
      }
    } else if (this.props.state.signup.viewData.signup.stage2) {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalityTest state={this.props.state} actions={this.props.actions} />
      if (this.props.state.signup.validationChecks.stage2) {
        formButton = <button onClick={this.props.actions.continueSurvey} className="question-form-button normal valid">Continue</button>
      } else if (this.props.state.signup.validationChecks.stage2error) {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid signup-error">Please Answer All Questions</button>
      } else {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid">Continue</button>
      }
    } else if (this.props.state.signup.viewData.signup.stage3) {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalityTest state={this.props.state} actions={this.props.actions} />
      if (this.props.state.signup.validationChecks.stage3) {
        formButton = <button onClick={this.props.actions.continueSurvey} className="question-form-button normal valid">Continue</button>
      } else if (this.props.state.signup.validationChecks.stage3error) {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid signup-error">Please Answer All Questions</button>
      } else {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid">Continue</button>
      }
    } else if (this.props.state.signup.viewData.signup.stage4) {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalityTest state={this.props.state} actions={this.props.actions} />
      if (this.props.state.signup.validationChecks.stage4) {
        formButton = <button onClick={this.props.actions.continueSurvey} className="question-form-button normal valid">Continue</button>
      } else if (this.props.state.signup.validationChecks.stage4error) {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid signup-error">Please Answer All Questions</button>
      } else {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid">Continue</button>
      }
    } else if (this.props.state.signup.viewData.signup.stage5) {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalQuestions state={this.props.state} actions={this.props.actions} />
      if (this.props.state.signup.validationChecks.stage5) {
        formButton = <button onClick={this.props.actions.continueSurvey} className="question-form-button normal valid">Continue</button>
      } else if (this.props.state.signup.validationChecks.stage5error) {
        if (!this.props.state.signup.validationChecks.emailCheck) {
          formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid signup-error">Please Enter Valid Email</button>
        } else if (!this.props.state.signup.validationChecks.passwordCheck) {
          formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid signup-error">Passwords Dont Match</button>
        } else {
          formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid signup-error">Please Answer All Questions</button>
        }
      } else {
        formButton = <button onClick={() => {this.surveyError(this.props)}} className="question-form-button normal invalid">Continue</button>
      }
    } else if (this.props.state.signup.viewData.signup.stage6) {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalQuestions state={this.props.state} actions={this.props.actions} />
      if (this.props.state.signup.validationChecks.clearForSubmit) {
        formButton = <button onClick={this.props.actions.continueSurvey} className="question-form-button normal valid">Submit</button>
      } else {
        formButton = <button className="question-form-button normal invalid">Submit</button>
      }
    } else if (this.props.state.signup.viewData.signup.stage7) {
      this.submitUserInfo(this.props)
      content = <div className="loading-gif"><img className="img-full" src="./client/img/match.gif" /></div>
    }

    return (
      <div>
        {progressBar}
        {content}
        <div className="question-form-submit-button">
          {formButton}
        </div>
      </div>
    )
  }
};

QuestionForm.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default QuestionForm
