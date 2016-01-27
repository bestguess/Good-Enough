import React, { Component, PropTypes } from 'react'

class PollContainer extends Component {
  render() {
    return (
      <div className="poll-container-card">
        <p className="poll-question">Poll Question: {this.props.state.profile.data.questions.question}</p>
        <button className="poll-button">{this.props.state.profile.data.questions.answers[2].answer}</button>
        <button className="poll-button">{this.props.state.profile.data.questions.answers[1].answer}</button>
        <button className="poll-button">{this.props.state.profile.data.questions.answers[0].answer}</button>
      </div>
    )
  }
}

PollContainer.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PollContainer