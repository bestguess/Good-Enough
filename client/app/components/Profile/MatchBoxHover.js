import React, { Component, PropTypes } from 'react'
import { status, json } from '../../helpers'

const connectRequest = function(props) {
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
    }).catch(function(error) {
      console.log('Request failed', error);
    });
  props.actions.connectRequest(connectData.match_id, 'request')
}

class MatchBoxHover extends Component {
  render() {
    var message;
    if (this.props.data.requestSent) {
      return (
          <div className="match-box-hover requestSent" onClick={() => {connectRequest(this.props)}}>
            <p className="match-box-name">{this.props.data.firstName} {this.props.data.lastName.charAt(0)}.</p>
            <span>Request Sent</span>
          </div>
        )
    } else {
      return (
          <div className="match-box-hover" onClick={() => {connectRequest(this.props)}}>
          	<p className="match-box-name">{this.props.data.firstName} {this.props.data.lastName.charAt(0)}.</p>
            <span>Connect</span>
          </div>
        )
      }
  }
}

MatchBoxHover.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MatchBoxHover