import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import PrivateNav from '../components/Nav/PrivateNav'
import ProfileUserData from '../components/Profile/ProfileUserData'
import PollContainer from '../components/Profile/PollContainer'
import ProfileConnections from '../components/Profile/ProfileConnections'
import ProfileMatches from '../components/ProfileMatches'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.actions.profile()
    // getUserInfo(this.props)
  }

  reRoute(props) {
    this.props.history.push({ pathname: '/' })
  }

  render() {
    if (!window.localStorage.getItem('GoodEnough')) this.reRoute(this.props)
    if (!this.props.state.profile.data) return <h1><i>Loading profile...</i></h1>
    const { state, actions } = this.props
    return (
      <div>
        <PrivateNav state={this.props.state} actions={this.props.actions} />
        <ProfileUserData state={this.props.state} actions={this.props.actions} />
        <PollContainer state={this.props.state} actions={this.props.actions} />
        <ProfileConnections state={this.props.state} actions={this.props.actions} />
        <ProfileMatches state={this.props.state} actions={this.props.actions} />
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
