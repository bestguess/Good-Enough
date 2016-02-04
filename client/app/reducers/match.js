import { SAVE_MATCH_DATA, SAVE_INPUT, UPDATE_CONVO, MATCH_LOGOUT, CLEAR_CURRENT_MATCH_DATA } from '../constants/Match_ActionTypes'
import { deleteAuthToken, clearMessagesInterval } from '../helpers'

const initialState = {
  conversation: []
}

export default function Match(state = initialState, action) {
  switch (action.type) {
  	case SAVE_MATCH_DATA:
    	var newState = Object.assign({}, state)
    	newState.data = action.data
      newState.data.interests = JSON.parse(newState.data.interests)
      newState.conversation = []
      newState.similarInterests = []
      action.profile_matches.forEach(function(match) {
        if (match.id === action.match_id) newState.similarInterests = match.common
      })
     	return newState


  	case SAVE_INPUT:
  		var newState = Object.assign({}, state)
  		newState.message = action.value
  		return newState


    case UPDATE_CONVO:
      var newState = Object.assign({}, state)
      // Updating convo in the state
      newState.conversation = action.convo.messages
    	return newState


    case CLEAR_CURRENT_MATCH_DATA:
      newState = { conversation: [] }
      return newState


    case MATCH_LOGOUT:
      var newState = Object.assign({}, state)
      // Gather User ID and Session Token from Local Storage
      var userData = window.localStorage.getItem('GoodEnough')
      // Make server request to delete token storage on server side
      fetch('/app/users/logout', {
        method: 'POST',
        headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: userData
      })
      clearMessagesInterval()
      deleteAuthToken()
      // Reset Initial Profile State (for if a different user logs on right after logout)
      newState = {};
      return newState


    default:
    	return state

  }
}
