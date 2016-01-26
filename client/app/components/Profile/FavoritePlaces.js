import React, { Component, PropTypes } from 'react'

class FavoritePlaces extends Component {

  handleKeyPress(e) {
    if (e.which === 13 && this.refs.place.value !== '') {
      var val = this.refs.place.value;
      this.refs.place.value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput('place', this.refs.place.value);
      this.refs.place.value = '';
    }
  }

  deleteInput(place) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('place', place)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="place" onKeyPress={(event) => this.handleKeyPress(event)} placeholder="add place..."/>
    return (
      <div className="user-interest-container">
        <span>Favorite Places: </span>
        {this.props.state.profile.data.places.map(place =>
            <span key={place} className="user-interest place" onClick={() => this.deleteInput(place)}>{place}</span>
        )}
        {editInput}
      </div>
    );
  }
}

FavoritePlaces.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default FavoritePlaces