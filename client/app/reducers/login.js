import { LOG_IN, SAVE_LOGIN_INPUT, LOG_IN_FAILED } from '../constants/Login_ActionTypes'

const initialState = {
  loggedStatus: true,
  userData: {
    email: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined,
    gender: undefined,
  	answers: []
  }
}

export default function LogIn(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOGIN_INPUT:
      var newState = Object.assign({}, state)
      newState.userData[action.input] = action.value
      if (!newState.loggedStatus) newState.loggedStatus = true
      return newState


    case LOG_IN:
      var newState = Object.assign({}, state)
      console.log('newState: ', newState)
      newState.loggedStatus = true;
      return newState


    case LOG_IN_FAILED:
      var newState = Object.assign({}, state)
      newState.loggedStatus = false;
      return newState


    default:
    	return state
      
  }
}
