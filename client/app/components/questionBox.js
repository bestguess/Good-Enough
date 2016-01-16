import React, { Component, PropTypes } from 'react'
import QuestionButtons from './QuestionButtons'

class QuestionBox extends Component {

  testFunction(choice) {
    this.props.actions.answerQuestion(this.props.data.id, choice)
  }

  render() {
    return (
      <div className="question">
        <span className="question-option" style={{float:'left', textAlign:'right'}}>{this.props.data.option1}</span>
        <QuestionButtons state={this.props.state} actions={this.props.actions} id={this.props.data.id} choices={[1, 2, 3, 4, 5]} answer={this.testFunction.bind(this)}/>
        <span className="question-option" style={{float:'right', textAlign:'left'}}>{this.props.data.option2}</span>
      </div>
    )
  }
};

QuestionBox.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default QuestionBox
