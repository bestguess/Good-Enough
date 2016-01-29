import React, { Component, PropTypes } from 'react'

class DiscussionInterests extends Component {
  render() {
    var values;
    if (this.props.state.match.data.interests.discussion.length > 0) {
      values = this.props.state.match.data.interests.discussion.map(topic =>
        <span key={topic} className="user-interest discussion">{topic}</span> )
    }
    return (
      <div className="user-interest-container">
        <span>Likes to talk about: </span>
        {values}
      </div>
    );
  }
}

DiscussionInterests.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default DiscussionInterests
