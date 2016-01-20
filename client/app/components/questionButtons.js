import React, { Component, PropTypes } from 'react'

class QuestionButtons extends Component {
  render() {
    return (
      <span style={{float:'left', textAlign:'center', width:'20%'}}>
        <ul className="question-buttons">
          <li className="question-button-large">
            <input onClick={() => this.props.answer(this.props.choices[0])} type='radio' value='1' name={this.props.id + 'question'}/>
            <label></label>
          </li>
          <li className="question-button-medium">
            <input onClick={() => this.props.answer(this.props.choices[1])} type='radio' value='2' name={this.props.id + 'question'}/>
            <label></label>
          </li>
          <li className="question-button-small">
            <input onClick={() => this.props.answer(this.props.choices[2])} type='radio' value='3' name={this.props.id + 'question'}/>
            <label></label>
          </li>
          <li className="question-button-medium">
            <input onClick={() => this.props.answer(this.props.choices[3])} type='radio' value='4' name={this.props.id + 'question'}/>
            <label></label>
          </li>
          <li className="question-button-large">
            <input onClick={() => this.props.answer(this.props.choices[4])} type='radio' value='5' name={this.props.id + 'question'}/>
            <label></label>
          </li>
        </ul>
      </span>
    )
  }
};

QuestionButtons.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default QuestionButtons
