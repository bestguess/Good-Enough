import { PROFILE } from '../constants/Profile_ActionTypes'

const initialState = {
   userData: {
    email: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined,
    gender: undefined
  }
}

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      console.log('hit the profile action')
      return state
    default:
      console.log('hit default case: returning state')
    	return state
  }
}
