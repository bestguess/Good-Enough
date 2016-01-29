import React, { Component, PropTypes } from 'react'

class FavoritePlaces extends Component {

  handleKeyDown(e, input) {
    if (e.which === 13 && this.refs[input].value !== '' || e.which === 188 && this.refs[input].value !== '' || e.which === 9 && this.refs[input].value !== '') {
      var val = this.refs[input].value;
      this.refs[input].value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput(input, this.refs[input].value);
      this.refs[input].value = '';
    }
  }

  handleKeyUp(e, input) {
    if (e.which === 188) this.refs[input].value = '';
  }

  deleteInput(place) {
    if (this.props.state.profile.editUserInfo) this.props.actions.deleteInput('place', place)
  }

  render() {
    var editInput;
    if (this.props.state.profile.editUserInfo) editInput = <input ref="place" onKeyDown={(event) => this.handleKeyDown(event, 'place')} onKeyUp={(event) => this.handleKeyUp(event, 'place')} placeholder="add place..."/>
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