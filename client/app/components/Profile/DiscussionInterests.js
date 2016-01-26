import React, { Component, PropTypes } from 'react'

class DiscussionInterests extends Component {

  handleKeyPress(e) {
    if (e.which === 13 && this.refs.discussion.value !== '') {
      var val = this.refs.discussion.value;
      this.refs.discussion.value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput('discussion', this.refs.discussion.value);
      this.refs.discussion.value = '';
    }
  }

  deleteInput(topic) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('discussion', topic)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="discussion" onKeyPress={(event) => this.handleKeyPress(event)} placeholder="add topic..."/>
    return (
      <div className="user-interest-container">
        <span>Likes to talk about: </span>
        {this.props.state.profile.data.interests.discussion.map(topic =>
            <span key={topic} className="user-interest discussion" onClick={() => this.deleteInput(topic)}>{topic}</span>
        )}
        {editInput}
      </div>
    );
  }
}

DiscussionInterests.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default DiscussionInterests