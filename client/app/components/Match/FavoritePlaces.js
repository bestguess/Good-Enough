import React, { Component, PropTypes } from 'react'

class FavoritePlaces extends Component {
  render() {
    var values;
    if (this.props.state.match.data.places.length > 0) {
      values = this.props.state.match.data.places.map(place =>
            <span key={place} className="user-interest place">{place}</span> )
    }
    return (
      <div className="user-interest-container">
        <span>Favorite Places: </span>
        {values}
      </div>
    );
  }
}

FavoritePlaces.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default FavoritePlaces
