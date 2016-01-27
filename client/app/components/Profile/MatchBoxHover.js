import React, { Component, PropTypes } from 'react'
import { status, json } from '../../helpers'

export const connectRequest = function(props) {
  var connectData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  connectData.match_id = props.data.id
  fetch('/app/matches/request', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(connectData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      props.actions.connectRequest(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

class MatchBoxHover extends Component {
  render() {
    return (
        <div className="match-box-hover" onClick={() => {connectRequest(this.props)}}>
        	<p className="match-box-name">{this.props.data.firstName} {this.props.data.lastName}</p>
        	<span>Connect</span>
        </div>
      )
  }
}

MatchBoxHover.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchBoxHover