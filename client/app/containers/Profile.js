import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import LogInForm from '../components/LogInForm'



class Profile extends Component {
  render() {
    if(!this.props.state.profile.serverCall) this.props.actions.profile()
    const { state, actions } = this.props
    return (
      <div>
        <p>Email: {this.props.state.profile.data.email}</p>
        <p>Name: {this.props.state.profile.data.firstName}</p>
        <p>Gender: {this.props.state.profile.data.gender}</p>
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
