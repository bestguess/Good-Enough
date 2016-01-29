import { SAVE_RECOVER_PASSWORD_INPUT, RECOVER_PASSWORD, RECOVER_PASSWORD_FAILED, RESET_PASSWORD, RESET_PASSWORD_FAILED, SAVE_NEW_PASSWORD_INPUT, SAVE_CONFIRM_NEW_PASSWORD_INPUT, SUBMIT_NEW_PASSWORD } from '../constants/UsernamePasswordReset_ActionTypes'

const initialState = {
  userData: {
    email: undefined,
    isFetching: false,
    foundEmail: true,
    emailReceived: false,
    newPassword: undefined,
    confirmNewPassword: undefined
  }
}

export default function RecoverPassword(state = initialState, action) {
  switch (action.type) {
    case SAVE_NEW_PASSWORD_INPUT:
      var newState = Object.assign({}, state)
      newState.userData[action.input] = action.value
      return newState

    case SAVE_CONFIRM_NEW_PASSWORD_INPUT:
      var newState = Object.assign({}, state)
      newState.userData[action.input] = action.value
      return newState

    case SAVE_RECOVER_PASSWORD_INPUT:
      var newState = Object.assign({}, state)
      newState.userData[action.input] = action.value
      return newState

    case RECOVER_PASSWORD:
      var newState = Object.assign({}, state)
      newState.userData.foundEmail = true;
      newState.userData.isFetching = false;
      newState.userData.emailReceived = true;
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

    case SUBMIT_NEW_PASSWORD:
      var newState = Object.assign({}, state)
      return newState

    default:
      console.log('hit default case: returning state in RecoverPassword')
      return state
  }
}
