import React, { Component, PropTypes } from 'react'

class MatchRating extends Component {
  render() {
    return (
        <div className="match-rating">
          <span>{this.props.rating}%</span>
        </div>
      )
  }
}

MatchRating.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchRating