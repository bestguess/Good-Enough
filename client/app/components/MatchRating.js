import React, { Component, PropTypes } from 'react'

class MatchRating extends Component {
  genPerc(perc) {
    var range;
    if (perc >= 60 && perc <= 69) { range = "mr-60-69" }
    else if (perc >= 70 && perc <= 79) { range = "mr-70-79" }
    else if (perc >= 80 && perc <= 89) { range = "mr-80-89" }
    else if (perc >= 90 && perc <= 100) { range = "mr-90-100" }
    else { range = "mr-0-59" }
    return <div className={"match-rating " + range}><span><p>{perc}%</p></span></div>
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
