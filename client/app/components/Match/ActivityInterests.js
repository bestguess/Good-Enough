import React, { Component, PropTypes } from 'react'

class ActivityInterests extends Component {
  render() {
    var values;
    if (this.props.state.match.data.interests.activity.length > 0) {
      values = this.props.state.match.data.interests.activity.map(activity =>
        <span key={activity} className="user-interest activity">{activity}</span> )
    }
    return (
      <div className="user-interest-container">
        <span>Likes to do: </span>
        {values}
      </div>
    );
  }
}

ActivityInterests.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ActivityInterests
