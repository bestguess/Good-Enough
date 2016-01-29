import React, { Component, PropTypes } from 'react'

class SimilarInterests extends Component {
  render() {
    return (
      <div className="similar-interests-card">
        <div className="similar-interests-header">Similar Interests</div>
        {this.props.state.match.similarInterests.map(interest =>
            <span key={interest} className="similar-interest">{interest}</span>
        )}
      </div>
    );
  }  
}

SimilarInterests.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default SimilarInterests
