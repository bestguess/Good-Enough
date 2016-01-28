import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../actions/profile'
import PrivateNav from '../components/Nav/PrivateNav'
import ProfileUserData from '../components/Profile/ProfileUserData'
import PollContainer from '../components/Profile/PollContainer'
import ProfileConnections from '../components/Profile/ProfileConnections'
import ProfileMatches from '../components/ProfileMatches'
import Footer from '../components/Footer'
import { getUserInfo } from '../helpers'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // this.props.actions.profile()
    getUserInfo(this.props)
  }

  reRoute(props) {
    this.props.history.push({ pathname: '/' })
  }

  render() {
    if (!window.localStorage.getItem('GoodEnough')) this.reRoute(this.props)
    if (!this.props.state.profile.data) return <h1><i>Loading profile...</i></h1>
    const { state, actions } = this.props
    var profileMatchesDisplay = [];
    var profileTempDisplay = [];
    var profileConnectionsDisplay = [];
    this.props.state.profile.data.matches.filter(function(match) {
      if (match.connected) {
        profileConnectionsDisplay.push(match)
      } else if (match.requested) {
        profileTempDisplay.push(match)
      } else if (match.display) {
        profileMatchesDisplay.push(match)
      }
    })
    console.log('hank: ', profileTempDisplay.length, profileConnectionsDisplay.length)
    var showPolling;
    if (this.props.state.profile.data.question.answers) showPolling = <PollContainer state={this.props.state} actions={this.props.actions} /> 
    var showConnections;
    if (profileTempDisplay.length > 0 && profileConnectionsDisplay.length > 0) showConnections = <ProfileConnections state={this.props.state} actions={this.props.actions} connections={profileConnectionsDisplay} temp={profileTempDisplay} />
    var showMatches;
    if (profileMatchesDisplay.length > 0) showMatches = <ProfileMatches state={this.props.state} actions={this.props.actions} matches={profileMatchesDisplay} />
    return (
      <div>
        <PrivateNav state={this.props.state} actions={this.props.actions} />
        <ProfileUserData state={this.props.state} actions={this.props.actions} />
        {showPolling}
        {showConnections}
        {showMatches}
        <Footer state={this.props.state} actions={this.props.actions} />
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
