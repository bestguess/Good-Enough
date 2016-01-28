import React, { Component, PropTypes } from 'react'
import { status, json } from '../../helpers'

export const connectRequest = function(props, response) {
  var connectData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  connectData.match_id = props.data.id
  fetch('/app/matches/'+response, {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(connectData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      props.actions.connectRequest(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

class TempBoxHover extends Component {
  render() {
    return (
        <div className="temp-box-hover">
        	<p className="match-box-name">{this.props.data.firstName} {this.props.data.lastName}</p>
          <i className="accept-connect-icon fa fa-check-circle" onClick={() => {connectRequest(this.props, 'accept')}}></i>
          <i className="reject-connect-icon fa fa-times-circle" onClick={() => {connectRequest(this.props, 'decline')}}></i>
        </div>
      )
  }
}

TempBoxHover.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default TempBoxHover