import { PROFILE, PROFILE_LOGOUT, CONNECT_REQUEST, EDIT_USER_INFO, SAVE_PROFILE_INPUT, DELETE_PROFILE_INPUT, UPDATE_POLL_QUESTION } from '../constants/Profile_ActionTypes'
import { deleteAuthToken } from '../helpers'

const initialState = {}

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      var newState = Object.assign({}, state)
      newState.data = action.data
      // Parse user interests & question object
      newState.data.interests = JSON.parse(newState.data.interests)
      if (newState.data.question) newState.data.question.answers = JSON.parse(newState.data.question.answers)
      return newState


    case CONNECT_REQUEST:
      var newState = Object.assign({}, state)
      if (action.action === 'request') {
        newState.data.matches.forEach(function(match) {
          if (match.id === action.match_id) match.requestSent = true;
        })
      } else if (action.action === 'accept') {
        newState.data.matches.forEach(function(match) {
          if (match.id === action.match_id) match.connected = true;
        })
      } else if (action.action === 'decline') {
        newState.data.matches.forEach(function(match) {
          if (match.id === action.match_id) {
            match.requested = false;
            match.display = false;
          }
        })
      }
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
        if (action.value === 'last') arr.pop()
        newState.data.interests.activity = arr
      } else if (action.input === "discussion") {
        var arr = []
        newState.data.interests.discussion.forEach(function(value) {
          if (value !== action.value) arr.push(value)
        })
        if (action.value === 'last') arr.pop()
        newState.data.interests.discussion = arr
      } else if (action.input === "place") {
        var arr = []
        newState.data.places.forEach(function(value) {
          if (value !== action.value) arr.push(value)
        })
        if (action.value === 'last') arr.pop()
        newState.data.places = arr
      }
      return newState


    case PROFILE_LOGOUT:
      var newState = Object.assign({}, state)
      // Gather User ID and Session Token from Local Storage
      var userData = window.localStorage.getItem('GoodEnough')
      // Make server request to delete token storage on server side
      fetch('/app/users/logout', {
        method: 'POST',
        headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: userData
      })
      deleteAuthToken()
      // Reset Initial Profile State (for if a different user logs on right after logout)
      newState = {};
      return newState


    default:
    	return state
      
  }
}
