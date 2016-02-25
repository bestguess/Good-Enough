import * as types from '../constants/UsernamePasswordReset_ActionTypes'
import { routeActions } from 'redux-simple-router'

export function decrementRedirectToLoginCount() {
  return { type: types.DECREMENT_REDIRECT_TO_LOGIN_COUNT }
}

export function saveRecoverPasswordInput(input, value) {
  return { type: types.SAVE_RECOVER_PASSWORD_INPUT, input, value }
}

export function saveNewPasswordInput(input, value) {
  return { type: types.SAVE_NEW_PASSWORD_INPUT, input, value }
}

export function saveConfirmNewPasswordInput(input, value) {
  return { type: types.SAVE_CONFIRM_NEW_PASSWORD_INPUT, input, value }
}

export function optimisticSubmitNewPassword() {
  return { type: types.SUBMIT_NEW_PASSWORD }
}

export function submitNewPasswordFailed() {
  return { type: types.SUBMIT_NEW_PASSWORD_FAILED }
}

export function recoverPasswordIsFetching() {
  return { type: types.RECOVER_PASSWORD_IS_FETCHING }
}

export function optimisticRecoverPassword(newData) {
  return { type: types.RECOVER_PASSWORD, newData }
}

export function recoverPasswordFailed() {
  return { type: types.RECOVER_PASSWORD_FAILED }
}

// recoverPassword and submitNewPassword are action creators that return functions instead of actions to our
// thunk-middlware. This allows us to delay actions and dispatch them synchronously. This becomes very useful
// in situations where we need to wait for a Promise to resolve before we dispatch more actions just like in our case below.

export function recoverPassword() {

  // We return a function here that is passed in the dispatch and getState methods in order to access them inside the middleware.
  return function (dispatch, getState) {

    // Dispatch recoverIsFetching to load spinner/fetching.
    dispatch(recoverPasswordIsFetching());
    var state = getState();
    var currState = state.usernamePasswordReset.userData;

    // Isomorphic fetch request to our API
    fetch('/app/recoverPassword/recover-password', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currState)
      })
      .then(res => {
        if (res.status >= 200 && res.status < 400) {
          res.json()
          // Set user ID and Session Token to localStorage
          .then(data => {
            // Dispatch the optimisticRecoverPassword so the reducer can update the stores state.
            dispatch(optimisticRecoverPassword());
          })
          // Inform the user to check his/her email for further instructions
          .then(() => { dispatch(routeActions.push('/recover-password')) });
        } else {
          // Dispatch a recoverPasswordFailed if failed.
          dispatch(recoverPasswordFailed());
        }
      })
      .catch(error => { console.log('request failed', error) });
  }
}

export function submitNewPassword() {

  return function (dispatch, getState) {

    // Dispatch recoverIsFetching to load spinner/fetching.
    dispatch(recoverPasswordIsFetching());
    var state = getState();
    var currState = state.usernamePasswordReset.userData;

    // Post request to the recoverPassword API using the clients unique token in their url.
    fetch('/app/recoverPassword' + state.routing.location.pathname, {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currState)
      })
      .then(res => {
        if (res.status >= 200 && res.status < 400) {
          res.json()
          .then(data => {
            // Dispatch optimisticRecoverPassword so the reducer can update the state.
            dispatch(optimisticSubmitNewPassword());
            // Display the redirect counter to the user every second for 5 seconds.
            var counter = setInterval(() => {
              dispatch(decrementRedirectToLoginCount());
            }, 1000);
            // Redirect user to /logIn after 5 seconds.
            setTimeout(() => {
              dispatch(routeActions.push('/logIn'));
              clearInterval(counter);
            }, 5000);
          })
        } else {
          // Dispatch submitNewPasswordFailed if failed.
          dispatch(submitNewPasswordFailed());
        }
      })
      .catch(error => { console.log('request failed', error) });
  }
}
