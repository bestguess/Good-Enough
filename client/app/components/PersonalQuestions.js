import React, { Component, PropTypes } from 'react'
import BirthdayDropdown from './BirthdayDropdown'
import Dropzone from 'react-dropzone'

class ActivityInterests extends Component {
  handleKeyPress(e) {
    if (e.which === 13 && this.refs.activity.value !== '') {
      this.props.actions.saveInput('activity', this.refs.activity.value);
      this.refs.activity.value = '';
    }
  }

  render() {
    return (
        <div className='interest-input-container'>
          {this.props.state.signup.userData.interests.activity.map(activity =>
            <span key={activity} className="activity">{activity}</span>
          )}
          <input className="interest-input" ref="activity" onKeyPress={(event) => this.handleKeyPress(event)} placeholder="add activity..."/>
        </div>
      )
  }
}


class Interests extends Component {
  render() {
    return (
        <div>
          <ActivityInterests state={this.props.state} actions={this.props.actions} />
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
