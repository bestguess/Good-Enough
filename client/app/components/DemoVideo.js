import React, { Component, PropTypes } from 'react'

class DemoVideo extends Component {
  render() {
    return (
      <div className="demo-video-container">
        <i onClick={this.props.actions.demoVideo} className="fa fa-times close-demo-video"></i>
        <iframe className="demo-video" src="https://player.vimeo.com/video/154797930" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </div>
      )
  }
}

DemoVideo.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default DemoVideo
