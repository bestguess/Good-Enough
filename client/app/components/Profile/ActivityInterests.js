import React, { Component, PropTypes } from 'react'

class ActivityInterests extends Component {

  handleKeyPress(e) {
    if (e.which === 13 && this.refs.activity.value !== '') {
      var val = this.refs.activity.value;
      this.refs.activity.value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput('activity', this.refs.activity.value);
      this.refs.activity.value = '';
    }
  }

  deleteInput(activity) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('activity', activity)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="activity" onKeyPress={(event) => this.handleKeyPress(event)} placeholder="add activity..."/>
    return (
      <div className="user-interest-container">
        <span>Likes to do: </span>
        {this.props.state.profile.data.interests.activity.map(activity =>
            <span key={activity} className="user-interest activity" onClick={() => this.deleteInput(activity)}>{activity}</span>
        )}
        {editInput}
      </div>
    );
  }
}

ActivityInterests.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ActivityInterests




