import React, { Component, PropTypes } from 'react'

class DiscussionInterests extends Component {

  handleKeyDown(e, input) {
    if (e.which === 13 && this.refs[input].value !== '' || e.which === 188 && this.refs[input].value !== '' || e.which === 9 && this.refs[input].value !== '' || e.which === 186 && this.refs[input].value !== '') {
      var val = this.refs[input].value;
      this.refs[input].value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput(input, this.refs[input].value);
      this.refs[input].value = '';
    } else if (e.which === 8) {
      this.props.actions.deleteInput(input, 'last')
    }
  }

  handleKeyUp(e, input) {
    if (e.which === 188 || e.which === 186) this.refs[input].value = '';
  }

  deleteInput(topic) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('discussion', topic)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="discussion" onKeyDown={(event) => this.handleKeyDown(event, 'discussion')} onKeyUp={(event) => this.handleKeyUp(event, 'discussion')} placeholder="add topic..."/>
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