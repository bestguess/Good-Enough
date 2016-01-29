import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MatchActions from '../actions/match'
import PrivateNav from '../components/Nav/PrivateNav'
import SimilarInterests from '../components/Match/SimilarInterests'
import { convertTimeStamp, status, json } from '../helpers'
import Footer from '../components/Footer'

function getMatchInfo(props) {
  props.actions.clearCurrentMatchData()
  var requestData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  requestData.match_id = props.state.routing.location.pathname.substring(1)
  fetch('/app/matches/match', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      props.actions.saveMatchData(requestData.match_id, data, props.state.profile.data.matches)
      getAllMessages(props)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

function sendMessage(props) {
  var messageData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  messageData.from = messageData.id;
  messageData.to = props.state.routing.location.pathname.substring(1);
  messageData.message = props.state.match.message;
  var convoLength = props.state.match.conversation.length
  var messageID;
  if (convoLength < 1) {
    messageID = 1
  } else {
    messageID = props.state.match.conversation[convoLength-1].id + 1
  }
  messageData.messageID = messageID;
  fetch('/app/messages/send', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      props.actions.sendMessage(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

function deleteMessage(props, messageID) {
  var messageData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  messageData.from = messageData.id;
  messageData.to = props.state.routing.location.pathname.substring(1);
  messageData.message_id = messageID;
  console.log('deleting this message: ', messageData)
  fetch('/app/messages/delete', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      props.actions.sendMessage(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

function getAllMessages(props) {
  var requestData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  requestData.match_id = props.state.routing.location.pathname.substring(1)
  fetch('/app/messages/get', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      props.actions.sendMessage(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

var messageInterval
function startMessagesInterval(props) {
  // messageInterval = setInterval(function() { getAllMessages(props) }, 5000)
}

function clearMessagesInterval(props) {
 // messageInterval = clearInterval(messageInterval)
}

class DiscussionInterests extends Component {
  render() {
    var values;
    if (this.props.state.match.data.interests.discussion.length > 0) {
      values = this.props.state.match.data.interests.discussion.map(topic =>
        <span key={topic} className="user-interest discussion">{topic}</span> )
    }
    return (
      <div className="user-interest-container">
        <span>Likes to talk about: </span>
        {values}
      </div>
    );
  }
}

class ActivityInterests extends Component {
  render() {
    var values;
    if (this.props.state.match.data.interests.activity.length > 0) {
      values = this.props.state.match.data.interests.activity.map(activity =>
        <span key={activity} className="user-interest activity">{activity}</span> )
    }
    return (
      <div className="user-interest-container">
        <span>Likes to do: </span>
        {values}
      </div>
    );
  }
}

class FavoritePlaces extends Component {
  render() {
    var values;
    if (this.props.state.match.data.places.length > 0) {
      values = this.props.state.match.data.places.map(place =>
            <span key={place} className="user-interest place">{place}</span> )
    }
    return (
      <div className="user-interest-container">
        <span>Favorite Places: </span>
        {values}
      </div>
    );
  }
}


class MatchPicture extends Component {
  render() {
    return (
      <div className="personal-info-card-picture">
        <img src={this.props.state.match.data.picture} />
      </div>
    );
  }
}

class MatchUserData extends Component {
  render() {
    return (
      <div className="personal-info-card-userdata">
        <h4>{this.props.state.match.data.firstName} {this.props.state.match.data.lastName}</h4>
        <ActivityInterests state={this.props.state} actions={this.props.actions} />
        <DiscussionInterests state={this.props.state} actions={this.props.actions} />
        <FavoritePlaces state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}


class MatchInfo extends Component {
  render() {
    return (
      <div className="personal-info-card">
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
        <img src={this.props.img}/>
      </div>
    );
  }
}

class MatchMessage extends Component {
  render() {
    var username;
    var picture;
    var deleteIcon;
    if (this.props.data.user === this.props.state.routing.location.pathname.substring(1)) {
      username = this.props.state.match.data.firstName + ' ' + this.props.state.match.data.lastName
      picture = this.props.state.match.data.picture
    } else {
      username = this.props.state.profile.data.firstName + ' ' + this.props.state.profile.data.lastName
      picture = this.props.state.profile.data.picture
      deleteIcon = <i className="delete-message fa fa-times-circle-o" onClick={() => deleteMessage(this.props, this.props.data.id)} ></i>
    }
    return (
      <div className="match-conversation-message">
        <MatchMessageImage state={this.props.state} actions={this.props.actions} img={ picture } />
        <span className="match-conversation-username">{ username }</span>
        <span className="match-conversation-timestamp">{ convertTimeStamp(this.props.data.date) }</span>
        {deleteIcon}
        <p>{this.props.data.message}</p>
      </div>
    );
  }
}

class MatchMessageInput extends Component {

  handleKeyUp() {
    this.props.actions.saveInput(this.refs.message.value)
  }

  handleKeyPress(e) {
    var checkSpaces = this.refs.message.value.replace(/\s+/g, "")
    if (e.which === 13 && this.refs.message.value !== '' && checkSpaces.length > 0) {
      sendMessage(this.props)
      this.refs.message.value = '';
    }
  }
  
  render() {
    return (
      <div className="match-conversation-input">
        <input placeholder="start typing..." ref="message" onKeyUp={() => this.handleKeyUp()} onKeyPress={(event) => this.handleKeyPress(event)}></input>
      </div>
    );
  }
}


class MatchConversation extends Component {
  render() {
    var noMessagesAlert;
    if (this.props.state.match.conversation.length === 0) noMessagesAlert = <div className="no-messages-alert">I feel a friendship in the making. Go ahead and start the conversation...</div>
    return (
      <div className="match-conversation-container">
        <div className="match-conversation-container-header">Messages</div>
        {noMessagesAlert}
        {this.props.state.match.conversation.map(message =>
          <MatchMessage key={message.date} data={message} state={this.props.state} actions={this.props.actions} />
        )}
        <MatchMessageInput state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

class Match extends Component {

  componentWillMount() {
    getMatchInfo(this.props)
    if (!messageInterval) {
      startMessagesInterval(this.props)
    } else {
      clearMessagesInterval()
      startMessagesInterval(this.props)
    }
  }

  reRoute(props) {
    this.props.history.push({ pathname: '/profile' })
  }

  render() {
    if (!this.props.state.profile.data) this.reRoute(this.props)
    if (!this.props.state.match.data) return <h1><i>Loading match...</i></h1>
    var similarInterests;
    if (this.props.state.match.similarInterests.length) similarInterests = <SimilarInterests state={this.props.state} actions={this.props.actions} />
    return (
      <div>
        <PrivateNav state={this.props.state} actions={this.props.actions} />
        <MatchInfo state={this.props.state} actions={this.props.actions} />
        {similarInterests}
        <MatchConversation state={this.props.state} actions={this.props.actions} />
        <Footer state={this.props.state} actions={this.props.actions} />
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
    state: state,
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
