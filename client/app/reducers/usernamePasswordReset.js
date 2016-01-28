import { SAVE_RECOVER_PASSWORD_INPUT, RECOVER_PASSWORD, RECOVER_PASSWORD_FAILED, RESET_PASSWORD, RESET_PASSWORD_FAILED } from '../constants/UsernamePasswordReset_ActionTypes'

const initialState = {
  userData: {
    email: undefined,
    isFetching: false,
    foundEmail: true
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
      newState.userData.foundEmail = true;
      newState.userData.isFetching = false;
      return newState

    case RECOVER_PASSWORD_FAILED:
      var newState = Object.assign({}, state)
      newState.userData.foundEmail = false
      newState.userData.isFetching = false;
      return newState

    case RESET_PASSWORD:
      var newState = Object.assign({}, state)
      return newState

    case RESET_PASSWORD_FAILED:
      var newState = Object.assign({}, state)
      return newState

    default:
      console.log('hit default case: returning state in RecoverPassword')
      return state
  }
}
