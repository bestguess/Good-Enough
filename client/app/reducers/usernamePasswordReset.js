import { SAVE_RECOVER_PASSWORD_INPUT, RECOVER_PASSWORD, RECOVER_PASSWORD_FAILED, SAVE_NEW_PASSWORD_INPUT, SAVE_CONFIRM_NEW_PASSWORD_INPUT, SUBMIT_NEW_PASSWORD, SUBMIT_NEW_PASSWORD_FAILED, RECOVER_PASSWORD_IS_FETCHING, DECREMENT_REDIRECT_TO_LOGIN_COUNT } from '../constants/UsernamePasswordReset_ActionTypes'

const initialState = {
  userData: {
    email: undefined,
    isFetching: false,
    foundEmail: true,
    emailReceived: false,
    newPassword: undefined,
    confirmNewPassword: undefined,
    newPasswordReceived: false,
    redirectCount: 5
  }
}

export default function RecoverPassword(state = initialState, action) {
  switch (action.type) {
    case DECREMENT_REDIRECT_TO_LOGIN_COUNT:
      var newState = Object.assign({}, state)
      newState.userData.redirectCount = action.count
      return newState

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

    case RECOVER_PASSWORD_IS_FETCHING:
      var newState = Object.assign({}, state)
      newState.userData.isFetching = true;
      return newState

    case RECOVER_PASSWORD:
      var newState = Object.assign({}, state)
      newState.userData.foundEmail = true;
      newState.userData.isFetching = false;
      newState.userData.emailReceived = true;
      return newState

    case RECOVER_PASSWORD_FAILED:
      var newState = Object.assign({}, state)
      newState.userData.foundEmail = false;
      newState.userData.isFetching = false;
      return newState

    case SUBMIT_NEW_PASSWORD:
      var newState = Object.assign({}, state)
      newState.userData.isFetching = false;
      newState.userData.newPasswordReceived = true;
      return newState

    case SUBMIT_NEW_PASSWORD_FAILED:
      var newState = Object.assign({}, state)
      newState.userData.newPasswordReceived = false;
      newState.userData.isFetching = false;
      return newState

    default:
      console.log('hit default case: returning state in RecoverPassword')
      return state
  }
}
