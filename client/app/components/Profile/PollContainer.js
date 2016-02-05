import React, { Component, PropTypes } from 'react'
import { status, json } from '../../helpers'

const answerPollQuestion = function(props, answer) {
  var userData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  var requestData = {};
  requestData.id = userData.id;
  requestData.answer = answer;
  fetch('/app/polling/answer', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('New Poll Question', data);
      props.actions.updatePollQuestion(data);
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

class PollContainer extends Component {
  render() {
    var answer1; var answer2; var answer3; var answer4;
    if (this.props.state.profile.data.question.answers[0]) answer1 = <button className="poll-button" onClick={() => answerPollQuestion(this.props, this.props.state.profile.data.question.answers[0].value)}>{this.props.state.profile.data.question.answers[0].answer}</button>
    if (this.props.state.profile.data.question.answers[1]) answer2 = <button className="poll-button" onClick={() => answerPollQuestion(this.props, this.props.state.profile.data.question.answers[1].value)}>{this.props.state.profile.data.question.answers[1].answer}</button>
    if (this.props.state.profile.data.question.answers[2]) answer3 = <button className="poll-button" onClick={() => answerPollQuestion(this.props, this.props.state.profile.data.question.answers[2].value)}>{this.props.state.profile.data.question.answers[2].answer}</button>
    if (this.props.state.profile.data.question.answers[3]) answer4 = <button className="poll-button" onClick={() => answerPollQuestion(this.props, this.props.state.profile.data.question.answers[3].value)}>{this.props.state.profile.data.question.answers[3].answer}</button>
    return (
      <div className="poll-container-card">
        <p className="poll-question">Poll: {this.props.state.profile.data.question.question}</p>
        <div className="poll-buttons">
          {answer4}
          {answer3}
          {answer2}
          {answer1}
        </div>
      </div>
    )
  }
}

PollContainer.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PollContainer