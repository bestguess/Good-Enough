import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MatchActions from '../actions/match'
import PrivateNav from '../components/PrivateNav'

class MatchPicture extends Component {
  render() {
    return (
      <div className="match-info-picture">
        <span>Match Picture Goes Here</span>
      </div>
    );
  }
}

class MatchUserData extends Component {
  render() {
    return (
      <div className="match-info-userdata">
        <span>Match MatchUserData Goes Here</span>
      </div>
    );
  }
}


class MatchInfo extends Component {
  render() {
    return (
      <div className="match-info-container">
        <MatchPicture state={this.props.state} actions={this.props.actions} />
        <MatchUserData state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

class MatchMessageImage extends Component {
  render() {
    return (
      <div className="match-conversation-image">
        <img src={this.props.state.profile.data.picture}/>
      </div>
    );
  }
}

class MatchMessage extends Component {
  render() {
    return (
      <div className="match-conversation-message">
        <MatchMessageImage state={this.props.state} actions={this.props.actions} />
        <span className="match-conversation-username">Username</span>
        <p>Message goes here</p>
      </div>
    );
  }
}

class MatchMessageInput extends Component {
  render() {
    return (
      <div className="match-conversation-input">
        <input placeholder="Match Message Input goes here"></input>
      </div>
    );
  }
}


class MatchConversation extends Component {
  render() {
    return (
      <div className="match-conversation-container">
        <MatchMessage state={this.props.state} actions={this.props.actions} />
        <MatchMessageInput state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

class Match extends Component {
  render() {
    return (
      <div>
        <PrivateNav state={this.props.state} actions={this.props.actions} />
        <MatchInfo state={this.props.state} actions={this.props.actions} />
        <MatchConversation state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
};

Match.PropTypes = {
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
    actions: bindActionCreators(MatchActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Match)
