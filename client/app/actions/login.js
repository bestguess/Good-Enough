import * as types from '../constants/Login_ActionTypes'
import { routeActions } from 'redux-simple-router'

export function optimisticLogIn() {
	return { type: types.LOG_IN }
}

export function saveLogInInput(input, value) {
  return { type: types.SAVE_LOGIN_INPUT, input, value }
}

export function logInFailed() {
  return { type: types.LOG_IN_FAILED }
}

export function logIn() {
  return function (dispatch, getState) {
    var state = getState();
    console.log('State inside login middleware: ', state);
    fetch('http://localhost:4000/app/users/signin', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.login.userData)
      })
      .then(res => {
        console.log('res: ', res)
        if (res.status >= 200 && res.status < 400) {
          console.log('original: ', res)
          res.json()
          // Set user ID and Session Token to localStorage
          .then(data => {console.log('jsoned data: ', data);
            window.localStorage.setItem('GoodEnough', JSON.stringify(data));
            // Dispatch the optimisticLogIn so the reducer can update the state.
            dispatch(optimisticLogIn());
          })
          // After the logIn reducer has updated the state, user gets redirected to the profile
          .then(() => { dispatch(routeActions.push('/profile'))});
        } else {
          console.log('FAILED YO');
          dispatch(logInFailed());
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
