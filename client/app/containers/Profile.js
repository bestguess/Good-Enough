import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import Nav from '../components/Nav'

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
    this.props.actions.profile()
  }

  render() {
    console.log('rendering: ', this)
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
