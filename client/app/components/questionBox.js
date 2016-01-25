import React, { Component, PropTypes } from 'react'
import QuestionButtons from './QuestionButtons'

class QuestionBox extends Component {

  submitAnswer(choice) {
    this.props.actions.answerQuestion(this.props.data.id, choice)
  }

  render() {
    return (
      <div className="question-container">
        <div className="question">
          <div className="question-option-left">
            <span className="question-option-left-text" style={{textAlign:'right',float:'right'}}>{this.props.data.option1}</span>
          </div>
          <div className="question-buttons">
            <QuestionButtons state={this.props.state} actions={this.props.actions} id={this.props.data.id} choices={[1, 2, 3, 4, 5]} answer={this.submitAnswer.bind(this)}/>
          </div>
          <div className="question-option-right">
            <span className="question-option-right-text" style={{textAlign:'left',float:'left'}}>{this.props.data.option2}</span>
          </div>
        </div>
      </div>
    )
  }
};

QuestionBox.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default QuestionBox
