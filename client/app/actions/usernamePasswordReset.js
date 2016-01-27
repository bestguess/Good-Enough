import * as types from '../constants/UsernamePasswordReset_ActionTypes'
import { routeActions } from 'redux-simple-router'

export function saveRecoverPasswordInput(input, value) {
  return { type: types.SAVE_RECOVER_PASSWORD_INPUT, input, value }
}

export function optimisticRecoverPassword(newData) {
  return { type: types.RECOVER_PASSWORD, newData }
}

export function recoverPassword() {
  return function (dispatch, getState) {
    var state = getState();
    console.log('State inside recoverPassword middleware: ', state);
    fetch('http://localhost:4000/app/recoverPassword/recover-password', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.usernamePasswordReset.userData.email)
      })
      .then(res => {
        console.log('res: ', res)
        if (res.status >= 200 && res.status < 400) {
          console.log('original: ', res)
          res.json()
          // Set user ID and Session Token to localStorage
          .then(data => {console.log('jsoned data: ', data);
            window.localStorage.setItem('GoodEnough', JSON.stringify(data));
            // Dispatch the optimisticRecoverPassword so the reducer can update the state.
            dispatch(optimisticRecoverPassword());
          })
          // TODO: inform the user to check his/her email for further instructions
          .then(() => { dispatch(routeActions.push('/recoverPassword'))});
        } else {
          console.log('FAILED YO');
          // TODO: dispatch a recoverPasswordFailed action if failed
          dispatch(recoverPasswordFailed());
          const error = new Error(res.statusText);
          error.res = res;
          throw error;
        }
      })
      .catch(error => { console.log('request failed', error)});
      console.log('logging in')
  }
  return null;
}
