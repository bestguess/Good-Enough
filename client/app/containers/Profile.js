import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import LogInForm from '../components/LogInForm'

class Profile extends Component {

  testFunction() {
    if(this.props.state.profile.data === undefined) {
      this.props.actions.profile()
    }
  }

  render() {
    this.testFunction()
    const { state, actions } = this.props
    return (
      <div>
        <p>profile</p>
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
