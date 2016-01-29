import React, { Component, PropTypes } from 'react'

class ActivityInterests extends Component {

  handleKeyDown(e, input) {
    if (e.which === 13 && this.refs[input].value !== '' || e.which === 188 && this.refs[input].value !== '' || e.which === 9 && this.refs[input].value !== '') {
      var val = this.refs[input].value;
      this.refs[input].value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput(input, this.refs[input].value);
      this.refs[input].value = '';
    }
  }

  handleKeyUp(e, input) {
    if (e.which === 188) this.refs[input].value = '';
  }

  deleteInput(activity) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('activity', activity)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="activity"  onKeyDown={(event) => this.handleKeyDown(event, 'activity')} onKeyUp={(event) => this.handleKeyUp(event, 'activity')} placeholder="add activity..."/>
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




