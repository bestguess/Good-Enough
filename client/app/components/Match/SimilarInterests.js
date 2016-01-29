import React, { Component, PropTypes } from 'react'

class SimilarInterests extends Component {
  render() {
    return (
      <div className="similar-interests-card">
        <span className="similar-interest">Biking</span>
        <span className="similar-interest">JavaScript</span>
        <span className="similar-interest">Hiking</span>
        <span className="similar-interest">Wine</span>
      </div>
    );
  }  
}

SimilarInterests.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default SimilarInterests
