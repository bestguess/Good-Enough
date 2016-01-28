import { PROFILE, LOGOUT, CONNECT_REQUEST, EDIT_USER_INFO, SAVE_PROFILE_INPUT, DELETE_PROFILE_INPUT, UPDATE_POLL_QUESTION } from '../constants/Profile_ActionTypes'

const initialState = {}

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      var newState = Object.assign({}, state)
      newState.data = action.data
      // Parse user interests & question object
      newState.data.interests = JSON.parse(newState.data.interests)
      if (newState.data.question.answers) newState.data.question.answers = JSON.parse(newState.data.question.answers)
      return newState


    case CONNECT_REQUEST:
      var newState = Object.assign({}, state)
      newState.data = action.data
      // Parse user interests & question object
      newState.data.interests = JSON.parse(newState.data.interests)
      if (newState.data.question.answers) newState.data.question.answers = JSON.parse(newState.data.question.answers)
      return newState


    case EDIT_USER_INFO:
      var newState = Object.assign({}, state)
      newState.editUserInfo = (!newState.editUserInfo) ? true : false
      return newState


    case SAVE_PROFILE_INPUT:
      var newState = Object.assign({}, state)
      if (action.input === "activity") {
        newState.data.interests.activity.push(action.value)
      } else if (action.input === "discussion") {
        newState.data.interests.discussion.push(action.value)
      } else if (action.input === "place") {
        newState.data.places.push(action.value)
      }
      return newState


    case UPDATE_POLL_QUESTION:
      var newState = Object.assign({}, state)
      if (action.data.answers) {
        newState.data.question = action.data
        newState.data.question.answers = JSON.parse(newState.data.question.answers)
      } else {
        delete newState.data.question
      }
      return newState


    case DELETE_PROFILE_INPUT:
      var newState = Object.assign({}, state)
      if (action.input === "activity") {
        var arr = []
        newState.data.interests.activity.forEach(function(value) {
          if (value !== action.value) arr.push(value)
        })
        newState.data.interests.activity = arr
      } else if (action.input === "discussion") {
        var arr = []
        newState.data.interests.discussion.forEach(function(value) {
          if (value !== action.value) arr.push(value)
        })
        newState.data.interests.discussion = arr
      } else if (action.input === "place") {
        var arr = []
        newState.data.places.forEach(function(value) {
          if (value !== action.value) arr.push(value)
        })
        newState.data.places = arr
      }
      return newState


    case LOGOUT:
      var newState = Object.assign({}, state)
      // Gather User ID and Session Token from Local Storage
      var userData = window.localStorage.getItem('GoodEnough')
      // Make server request to delete token storage on server side
      fetch('/app/users/logout', {
        method: 'post',
        headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: userData
      })
      // Remove local storage ID and Token
      window.localStorage.removeItem('GoodEnough');
      // Reset Initial Profile State (for if a different user logs on right after logout)
      newState = {};
      return newState


    default:
    	return state
      
  }
}
