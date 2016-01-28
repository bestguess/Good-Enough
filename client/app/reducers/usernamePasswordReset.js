import { SAVE_RECOVER_PASSWORD_INPUT, RECOVER_PASSWORD } from '../constants/UsernamePasswordReset_ActionTypes'

const initialState = {
  userData: {
    email: undefined
  }
}

export default function RecoverPassword(state = initialState, action) {
  switch (action.type) {
    case SAVE_RECOVER_PASSWORD_INPUT:
      var newState = Object.assign({}, state)
      newState.userData[action.input] = action.value
      return newState

    case RECOVER_PASSWORD:
      var newState = Object.assign({}, state)
      newState.newData = action.newData
      return newState

    default:
      console.log('hit default case: returning state in RecoverPassword')
      return state
  }
}