import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import Nav from '../components/Nav'

function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function json(response) {  
  return response.json()  
}

function getUserInfo(props) {
    var userData = window.localStorage.getItem('GoodEnough')
          fetch('http://localhost:4000/app/users/info', {
                  method: 'post',
                  headers: {
                    'mode': 'no-cors',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(JSON.parse(userData))
                })  
      .then(status)  
      .then(json)  
      .then(function(data) {  
        console.log('Request succeeded with JSON response', data); 
        props.actions.profile(data)
      }).catch(function(error) {  
        console.log('Request failed', error);  
      });
  }

class ProfileData extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div className="profile-page-data">
        <p>Email: {this.props.state.profile.data.email}</p>
        <p>Name: {this.props.state.profile.data.firstName} {this.props.state.profile.data.lastName}</p>
        <p>Gender: {this.props.state.profile.data.gender}</p>
      </div>
    )
  }
}

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    getUserInfo(this.props)
  }

  render() {
    console.log('rendering: ', this)
    if (!this.props.state.profile.data) {
      return <h1><i>Loading profile...</i></h1>
    }
    const { state, actions } = this.props
    return (
      <div>
        <Nav state={this.props.state} actions={this.props.actions} />
        <ProfileData state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
};

Profile.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProfileActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
