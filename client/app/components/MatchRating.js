import React, { Component, PropTypes } from 'react'

class MatchRating extends Component {
  genPerc(perc) {
    var range

    if (perc <= 45) { range = "0-45" }
    else if (perc >= 46 && perc <= 55) { range = "46-55" }
    else if (perc >= 56 && perc <= 65) { range = "56-65" }
    else if (perc >= 66 && perc <= 75) { range = "66-75" }
    else if (perc >= 76 && perc <= 85) { range = "76-85" }
    else if (perc >= 86 && perc <= 95) { range = "86-95" }
    else { range = "96-100" }

    var ratingClassFore = "percent-" + range
    var ratingClassBack = "match-rating-" + range
    var percEl = <div className={ratingClassBack}><span><p className={ratingClassFore}>{perc}%</p></span></div>

    return percEl;
  }

  render() {

    return (
      <div>
        {this.genPerc(this.props.rating)}
      </div>
      )
  }
}

MatchRating.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchRating
