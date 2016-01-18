import React, { Component, PropTypes } from 'react'

class ProgressBar extends Component {
  render() {
    var progressValue;
    if (this.props.state.signup.viewData.signup.stage1) {
      progressValue = 0
    } else if (this.props.state.signup.viewData.signup.stage2) {
      progressValue = 20
    } else if (this.props.state.signup.viewData.signup.stage3) {
      progressValue = 40
    } else if (this.props.state.signup.viewData.signup.stage4) {
      progressValue = 60
    } else if (this.props.state.signup.viewData.signup.stage5) {
      progressValue = 80
    }
    return (
        <div className="progress-bar-container">
          <progress value={progressValue} max="100"></progress>
        </div>
      )
  }
}

ProgressBar.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ProgressBar