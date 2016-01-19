import { LOG_IN, SAVE_LOGIN_INPUT } from '../constants/Login_ActionTypes'

const initialState = {
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
      state.userData[action.input] = action.value
      return state
    case LOG_IN:

    default:
      console.log('hit default case: returning state')
    	return state
  }
}
