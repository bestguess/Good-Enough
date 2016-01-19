import React, { Component, PropTypes } from 'react'
import PersonalQuestions from './PersonalQuestions'
import PersonalityTest from './PersonalityTest'
import ProgressBar from './ProgressBar'
const { Link } = require('react-router');

class QuestionForm extends Component {
  render() {
    var content;
    var formButton;
    var progressBar;
    console.log('this: ', this)
    if (this.props.state.signup.viewData.signup.stage0) {
      formButton = <button onClick={this.props.actions.continueSurvey} className="start-test">Start Test</button>
    } else if (!this.props.state.signup.viewData.signup.stage5) {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalityTest state={this.props.state} actions={this.props.actions} />
      formButton = <button onClick={this.props.actions.continueSurvey} className="question-form-button">Continue</button>
    } else {
      progressBar = <ProgressBar state={this.props.state} actions={this.props.actions} />
      content = <PersonalQuestions state={this.props.state} actions={this.props.actions} />
      formButton = <Link to="/profile"><button onClick={this.props.actions.submitSurvey} className="question-form-button">Submit</button></Link>
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
