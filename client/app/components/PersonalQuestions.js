import React, { Component, PropTypes } from 'react'
import BirthdayDropdown from './BirthdayDropdown'
import Dropzone from 'react-dropzone'

class PersonalQuestions extends Component {

  handleKeyUp(input) {
    this.props.actions.saveInput(input, this.refs[input].value)
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
          <input placeholder="Email" ref="email" onKeyUp={() => this.handleKeyUp('email')} />
          <input type="password" placeholder="Password" ref="password" onKeyUp={() => this.handleKeyUp('password')} />
          <input type="password" placeholder="Please Confirm Password" />
          <input placeholder="First Name" ref="firstname" onKeyUp={() => this.handleKeyUp('firstname')} />
          <input placeholder="Last Name" ref="lastname" onKeyUp={() => this.handleKeyUp('lastname')} />
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

PersonalQuestions.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired

}

export default PersonalQuestions
