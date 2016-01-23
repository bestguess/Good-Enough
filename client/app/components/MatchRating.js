import React, { Component, PropTypes } from 'react'

class MatchRating extends Component {
  render() {
    var perc = this.props.rating;
    console.log('RATING YO: ', perc)
    var percent;

    if (perc <= 45) {
      percent = <div className="match-rating-0-45"><span><p className="percent-0-45 perc">{perc}%</p></span></div>
    } else if (perc >= 46 && perc <= 55) {
      percent = <div className="match-rating-46-55"><span><p className="percent-46-55 perc">{perc}%</p></span></div>
    } else if (perc >= 56 && perc <= 65) {
      percent = <div className="match-rating-56-65"><span><p className="percent-56-65 perc">{perc}%</p></span></div>
    } else if (perc >= 66 && perc <= 75) {
      percent = <div className="match-rating-66-75"><span><p className="percent-66-75 perc">{perc}%</p></span></div>
    } else if (perc >= 76 && perc <= 85) {
      percent = <div className="match-rating-76-85"><span><p className="percent-76-85 perc">{perc}%</p></span></div>
    } else if (perc >= 86 && perc <= 95) {
      percent = <div className="match-rating-86-95"><span><p className="percent-86-95 perc">{perc}%</p></span></div>
    } else if (perc >= 96 && perc <= 100) {
      percent = <div className="match-rating-96-100"><span><p className="percent-96-100 perc">{perc}%</p></span></div>
    } else {
      percent = <p>Error</p>
    }
    return (
      <div>
        {percent}
      </div>
      )
  }
}

MatchRating.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchRating
