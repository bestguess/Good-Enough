import { LOG_IN } from '../constants/Login_ActionTypes'

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
    case LOG_IN:

      return state
    default:
      console.log('hit default case: returning state')
    	return state
  }
}
