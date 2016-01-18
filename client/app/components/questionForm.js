import React, { Component, PropTypes } from 'react'
import PersonalQuestions from './PersonalQuestions'
import PersonalityTest from './PersonalityTest'

class QuestionForm extends Component {
  render() {
    var content;
    var formButton;
    console.log('this: ', this)
    if (this.props.state.questions.viewData.signup.stage0) {
      formButton = <button onClick={this.props.actions.continueSurvey} >Start Test</button>
    } else if (!this.props.state.questions.viewData.signup.stage5) {
      content = <PersonalityTest state={this.props.state} actions={this.props.actions} />
      formButton = <button onClick={this.props.actions.continueSurvey} >Continue</button>
    } else {
      content = <PersonalQuestions state={this.props.state} actions={this.props.actions} />
      formButton = <button onClick={this.props.actions.submitSurvey} >Submit</button>
    }

    return (
      <div>
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
