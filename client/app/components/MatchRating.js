import React, { Component, PropTypes } from 'react'

class MatchRating extends Component {
  render() {
    var perc = this.props.rating;
    console.log('RATING YO: ', perc)
    var percent;

    if (perc <= 45) {
      percent = <p className="percent-0-45 perc">{perc}%</p>
    } else if (perc >= 46 && perc <= 55) {
      percent = <p className="percent-46-55 perc">{perc}%</p>
    } else if (perc >= 56 && perc <= 65) {
      percent = <p className="percent-56-65 perc">{perc}%</p>
    } else if (perc >= 66 && perc <= 75) {
      percent = <p className="percent-66-75 perc">{perc}%</p>
    } else if (perc >= 76 && perc <= 85) {
      percent = <p className="percent-76-85 perc">{perc}%</p>
    } else if (perc >= 86 && perc <= 95) {
      percent = <p className="percent-86-95 perc">{perc}%</p>
    } else if (perc >= 96 && perc <= 100) {
      percent = <p className="percent-96-100 perc">{perc}%</p>
    } else {
      percent = <p>Error</p>
    }
    return (
        <div className="match-rating">
          <span>{percent}</span>
        </div>
      )
  }
}

MatchRating.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchRating
