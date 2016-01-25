import { PROFILE, LOGOUT, CONNECT, EDIT_USER_INFO } from '../constants/Profile_ActionTypes'

const initialState = {

}

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      var newState = Object.assign({}, state)
      newState.data = action.data
      // Parse user interests object
      newState.data.interests = JSON.parse(newState.data.interests)
      return newState

    case CONNECT:
      var newState = Object.assign({}, state)
      newData.data = action.newData
      return newState

    case EDIT_USER_INFO:
      var newState = Object.assign({}, state)
      newState.editUserInfo = (!newState.editUserInfo) ? true : false
      return newState

    case LOGOUT:
      var newState = Object.assign({}, state)

      // Gather User ID and Session Token from Local Storage
      var userData = window.localStorage.getItem('GoodEnough')
      // Make server request to delete token storage on server side
      fetch('http://localhost:4000/app/users/logout', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.parse(userData))
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
