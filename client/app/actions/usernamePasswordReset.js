import * as types from '../constants/UsernamePasswordReset_ActionTypes'
import { routeActions } from 'redux-simple-router'

export function decrementRedirectToLoginCount(count) {
  return { type: types.DECREMENT_REDIRECT_TO_LOGIN_COUNT, count }
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

export function recoverPassword() {
  return function (dispatch, getState) {
    // Dispatch recoverIsFetching to load spinner/fetching.
    dispatch(recoverPasswordIsFetching());
    var state = getState();
    var currState = state.usernamePasswordReset.userData;
    console.log('Current State inside recoverPassword middleware: ', currState);
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
        console.log('res: ', res);
        if (res.status >= 200 && res.status < 400) {
          res.json()
          .then(data => {
            console.log('Server Response: ', data);
            // Dispatch the optimisticRecoverPassword so the reducer can update the state.
            dispatch(optimisticRecoverPassword());
          })
          // Redirect user to check his/her email for further instructions.
          .then(() => { dispatch(routeActions.push('/recover-password')) });
        } else {
          console.log('FAILED YO');
          // Dispatch a recoverPasswordFailed action if failed.
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
    var currState = state.usernamePasswordReset.userData;
    console.log('currState inside recoverPassword middleware: ', currState);
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
        console.log('res: ', res);
        if (res.status >= 200 && res.status < 400) {
          res.json()
          .then(data => {
            console.log('Server Response: ', data);
            // Dispatch the optimisticRecoverPassword so the reducer can update the state.
            dispatch(optimisticSubmitNewPassword());
            // We use a seperate counter to decrement to avoid mutating the state then pass it into the reducer.
            var newCount = 5;
            // Show redirect counter to user.
            var counter = setInterval(() => {
              newCount--;
              console.log('redirectCount: ', currState.redirectCount);
              // Dispatch decrement action to update the state every second so user can see the countdown.
              dispatch(decrementRedirectToLoginCount(newCount));
            }, 1000);
            // Redirect user to /logIn after 5 seconds.
            setTimeout(() => {
              dispatch(routeActions.push('/logIn'));
              clearInterval(counter);
            }, 5000);
          })
        } else {
          // Dispatch submitNewPasswordFailed to stop spinner/fetching.
          dispatch(submitNewPasswordFailed());
        }
      })
      .catch(error => { console.log('request failed', error) });
  }
  return null;
}
