import { LOG_IN, SAVE_LOGIN_INPUT } from '../constants/Login_ActionTypes'

const initialState = {
  userData: {
    email: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined,
    gender: undefined,
  	answers: []
  }
}

export default function LogIn(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOGIN_INPUT:
      state.userData[action.input] = action.value
      return state
    case LOG_IN:
      console.log('state yo', state);

      fetch('http://localhost:4000/app/users/signin', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.userData)
      })
      .then(res => {
        console.log('res: ', res)
        if (res.status >= 200 && res.status < 300) {
          console.log('original: ', res)
          res.json().then(data => console.log('jsoned data: ', data));
        } else {
          const error = new Error(res.statusText);
          error.res = res;
          throw error;
        }
      })
      .catch(error => { console.log('request failed', error)});
      console.log('submitting survey')
      return state
    default:
      console.log('hit default case: returning state')
    	return state
  }
}
