import * as types from '../constants/UsernamePasswordReset_ActionTypes'
import { routeActions } from 'redux-simple-router'

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

export function recoverPassword() {
  return function (dispatch, getState) {
    // Dispatch recoverIsFetching to load spinner
    dispatch(recoverPasswordIsFetching());

    var state = getState();
    var email = state.usernamePasswordReset.userData;
    console.log('State inside recoverPassword middleware: ', state);
    console.log('Email inside recoverPassword middleware: ', email);
    fetch('/app/recoverPassword/recover-password', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      })
      .then(res => {
        console.log('res: ', res)
        if (res.status >= 200 && res.status < 400) {
          console.log('original: ', res)
          res.json()
          // Set user ID and Session Token to localStorage
          .then(data => {console.log('Server Response: ', data);
            // Dispatch the optimisticRecoverPassword so the reducer can update the state.
            dispatch(optimisticRecoverPassword());
          })
          // TODO: inform the user to check his/her email for further instructions
          .then(() => { dispatch(routeActions.push('/recover-password')) });
        } else {
          console.log('FAILED YO');
          // TODO: dispatch a recoverPasswordFailed action if failed
          dispatch(recoverPasswordFailed());
        }
      })
      .catch(error => { console.log('request failed', error)});
  }
  return null;
}

export function submitNewPassword() {
  var count = 0;
  return function (dispatch, getState) {
    // Dispatch recoverIsFetching to load spinner/fetching.
    dispatch(recoverPasswordIsFetching());
    var state = getState();
    var email = state.usernamePasswordReset.userData;
    console.log('State inside recoverPassword middleware: ', state);
    console.log('Email inside recoverPassword middleware: ', email);
    fetch('/app/recoverPassword' + state.routing.location.pathname, {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      })
      .then(res => {
        console.log('res: ', res)
        if (res.status >= 200 && res.status < 400) {
          var start = new Date().getTime()/1000;
          console.log('original: ', res)
          res.json()
          .then(data => {
            console.log('Server Response: ', data);
            // Dispatch the optimisticRecoverPassword so the reducer can update the state.
            dispatch(optimisticSubmitNewPassword());
            // Redirect user to /logIn after 5 seconds.
            setTimeout(() => {dispatch(routeActions.push('/logIn'))}, 5000)
          })
        } else {
          // Dispatch submitNewPasswordFailed to stop spinner/fetching.
          dispatch(submitNewPasswordFailed());
        }
      })
      .catch(error => { console.log('request failed', error)});
  }
  return null;
}
