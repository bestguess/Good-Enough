import {
  SAVE_RECOVER_PASSWORD_INPUT,
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_FAILED,
  SAVE_NEW_PASSWORD_INPUT,
  SAVE_CONFIRM_NEW_PASSWORD_INPUT,
  SUBMIT_NEW_PASSWORD,
  SUBMIT_NEW_PASSWORD_FAILED,
  RECOVER_PASSWORD_IS_FETCHING,
  DECREMENT_REDIRECT_TO_LOGIN_COUNT
 } from '../constants/UsernamePasswordReset_ActionTypes'

const initialState = {
  userData: {
    // Email input to recover password.
    email: undefined,
    // If isFetching, notify user with a spinner/message that the request is being loaded. This prop can be used in multiple instances where requests may take a while, such as used in submitting email and submitting new password.
    isFetching: false,
    // If !foundEmail, error message will notify user that his/her email was not found.
    foundEmail: true,
    // If emailReceived, user will be redirected and shown a message to check their email for further instructions.
    emailReceived: false,
    // New password inputs.
    newPassword: undefined,
    confirmNewPassword: undefined,
    // If newPasswordReceived, user is shown a message along with a counter and a link that will redirect him/her to /login.
    newPasswordReceived: false,
    redirectCount: 5
  }
}

export default function RecoverPassword(state = initialState, action) {

  switch (action.type) {

    case DECREMENT_REDIRECT_TO_LOGIN_COUNT:
    // We use Object.assign({}, state) to update the pre-existing stores state with new data from our actions.
    // This way we avoid mutating the state directly.
      var newState = Object.assign({}, state)
      newState.userData.redirectCount--
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
      return state
  }
}
