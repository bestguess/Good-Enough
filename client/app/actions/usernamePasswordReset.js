import * as types from '../constants/UsernamePasswordReset_ActionTypes'
import { routeActions } from 'redux-simple-router'

export function saveRecoverPasswordInput(input, value) {
  return { type: types.SAVE_RECOVER_PASSWORD_INPUT, input, value }
}

export function optimisticRecoverPassword(newData) {
  return { type: types.RECOVER_PASSWORD, newData }
}

export function recoverPasswordFailed() {
  return { type: types.RECOVER_PASSWORD_FAILED }
}

export function recoverPassword() {
  return function (dispatch, getState) {
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
          .then(() => { dispatch(routeActions.push('/recover-password'))});
        } else {
          console.log('FAILED YO');
          // TODO: dispatch a recoverPasswordFailed action if failed
          dispatch(recoverPasswordFailed());
        }
      })
      .catch(error => { console.log('request failed', error)});
      console.log('recovering password...')
  }
  return null;
}
