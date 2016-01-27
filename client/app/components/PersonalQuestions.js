import React, { Component, PropTypes } from 'react'
import BirthdayDropdown from './BirthdayDropdown'
import Dropzone from 'react-dropzone'

class ActivityInterests extends Component {
  handleKeyDown(e, input) {
    if (e.which === 13 && this.refs[input].value !== '' || e.which === 188 && this.refs[input].value !== '' || e.which === 9 && this.refs[input].value !== '') {
      var val = this.refs[input].value;
      this.refs[input].value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput(input, this.refs[input].value);
      this.refs[input].value = '';
    }
  }

  handleKeyUp(e, input) {
    if (e.which === 188) this.refs[input].value = '';
  }

  render() {
    var stateValues;
    if (this.props.state.signup.userData.interests.activity.length > 0) {
      stateValues = this.props.state.signup.userData.interests.activity.map(activity =>
                      <span key={activity} className="activity" onClick={() => this.deleteInput(activity)}>{activity}</span> )
    }
    return (
        <div className='interest-input-container'>
          <p>What activities do you like to do with friends?</p>
          {stateValues}
          <input className="interest-input" ref="activity" onKeyDown={(event) => this.handleKeyDown(event, 'activity')} onKeyUp={(event) => this.handleKeyUp(event, 'activity')} placeholder="add activity..."/>
        </div>
      )
  }
}

class DiscussionInterests extends Component {
  handleKeyDown(e, input) {
    if (e.which === 13 && this.refs[input].value !== '' || e.which === 188 && this.refs[input].value !== '' || e.which === 9 && this.refs[input].value !== '') {
      var val = this.refs[input].value;
      this.refs[input].value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput(input, this.refs[input].value);
      this.refs[input].value = '';
    }
  }

  handleKeyUp(e, input) {
    if (e.which === 188) this.refs[input].value = '';
  }

  render() {
    var stateValues;
    if (this.props.state.signup.userData.interests.discussion.length > 0) {
      stateValues = this.props.state.signup.userData.interests.discussion.map(discussion =>
                      <span key={discussion} className="discussion" onClick={() => this.deleteInput(discussion)}>{discussion}</span> )
    }
    return (
        <div className='interest-input-container'>
          <p>What topics do you like to talk about with friends?</p>
          {stateValues}
          <input className="interest-input" ref="discussion" onKeyDown={(event) => this.handleKeyDown(event, 'discussion')} onKeyUp={(event) => this.handleKeyUp(event, 'discussion')} placeholder="add topic..."/>
        </div>
      )
  }
}

class FavoritePlaces extends Component {
  handleKeyDown(e, input) {
    if (e.which === 13 && this.refs[input].value !== '' || e.which === 188 && this.refs[input].value !== '' || e.which === 9 && this.refs[input].value !== '') {
      var val = this.refs[input].value;
      this.refs[input].value = val.charAt(0).toUpperCase() + val.slice(1);
      this.props.actions.saveInput(input, this.refs[input].value);
      this.refs[input].value = '';
    }
  }

  handleKeyUp(e, input) {
    if (e.which === 188) this.refs[input].value = '';
  }

  render() {
    console.log('places length: ', this.props.state.signup.userData.places.length)
    var stateValues;
    if (this.props.state.signup.userData.places.length > 0) {
      stateValues = this.props.state.signup.userData.places.map(place =>
                      <span key={place} className="place" onClick={() => this.deleteInput(place)}>{place}</span> )
    }
    return (
        <div className='interest-input-container'>
          <p>What are your favorite places to hang out around Austin?</p>
          {stateValues}
          <input className="interest-input" ref="place" onKeyDown={(event) => this.handleKeyDown(event, 'place')} onKeyUp={(event) => this.handleKeyUp(event, 'place')} placeholder="add place..."/>
        </div>
      )
  }
}


class Interests extends Component {
  render() {
    return (
        <div className="user-interest-form">
          <ActivityInterests state={this.props.state} actions={this.props.actions} />
          <DiscussionInterests state={this.props.state} actions={this.props.actions} />
          <FavoritePlaces state={this.props.state} actions={this.props.actions} />
        </div>
      )
  }
}


class BasicUserInfo extends Component {

  handleKeyUp(event,input) {
    this.props.actions.saveInput(input, this.refs[input].value);
    if(event){
      if(event.which < 91 && event.which > 59 || event.which === 16 || event.which === 32){
        if(input === "firstname" || input === "lastname"){
          var val = this.refs[input].value || "";
          this.refs[input].value = val.charAt(0).toUpperCase() + val.slice(1)
        }
        this.props.actions.saveInput(input, this.refs[input].value)
      }else if(event.which !== 91 && event.which !== 8){
        var val = this.refs[input].value || "";
        this.refs[input].value = val.slice(0,val.length-1);
        this.props.actions.saveInput(input, this.refs[input].value)
      }
    }
  }

  onDrop(file) {
    function convertImgToBase64URL(url, dropzone, outputFormat){
      var img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function(){
          var canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'), dataURL
          canvas.height = img.height
          canvas.width = img.width
          ctx.drawImage(img, 0, 0)
          dataURL = canvas.toDataURL()
          dropzone.props.actions.saveInput('picture', dataURL)
          canvas = null
      }
      img.src = url
    }
    convertImgToBase64URL(file[0].preview, this);
  }

  render() {
    return (
        <div className="user-info-form">
          <input placeholder="Email" ref="email" onKeyUp={() => this.handleKeyUp(null,'email')} />
          <input type="password" placeholder="Password" ref="password" onKeyUp={() => this.handleKeyUp(null,'password')} />
          <input type="password" placeholder="Please Confirm Password" />
          <input placeholder="First Name" ref="firstname" onKeyUp={(event) => this.handleKeyUp(event,'firstname')} />
          <input placeholder="Last Name" ref="lastname" onKeyUp={(event) => this.handleKeyUp(event,'lastname')} />
          <ul className="gender-buttons">
            <li>
              <input onClick={() => this.props.actions.saveInput('gender', 'female')} type='radio' name='user-gender'/>
              <label>Female</label>
            </li>
            <li>
              <input onClick={() => this.props.actions.saveInput('gender', 'male')} type='radio' name='user-gender'/>
              <label>Male</label>
            </li>
          </ul>

          <BirthdayDropdown state={this.props.state} actions={this.props.actions} />

          <Dropzone ref="picture" className="dropzone" onDrop={this.onDrop} state={this.props.state} actions={this.props.actions}>
            <div className="dropzone-text">Upload profile picture by dropping a photo here</div>
          </Dropzone>
        </div>
      )
  }
}

class PersonalQuestions extends Component {
  render() {
    var content;
    if (this.props.state.signup.viewData.signup.stage5) {
      content = <BasicUserInfo state={this.props.state} actions={this.props.actions} />
    } else if (this.props.state.signup.viewData.signup.stage6) {
      content = <Interests state={this.props.state} actions={this.props.actions} />
    }
    return (
        <div>
          {content}
        </div>
      )
  }
}


PersonalQuestions.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired

}

export default PersonalQuestions
