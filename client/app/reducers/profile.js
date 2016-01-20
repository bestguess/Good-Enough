import { PROFILE } from '../constants/Profile_ActionTypes'

const initialState = {
  serverCall: false,
  data: {}
}

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      var newState = Object.assign({}, state)
      var userData = window.localStorage.getItem('GoodEnough')
      fetch('http://localhost:4000/app/users/info', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.parse(userData))
      })
      .then(res => {
        console.log('res: ', res)
        if (res.status >= 200 && res.status < 300) {
          console.log('original: ', res)
          res.json().then(data => {console.log('jsoned data: ', data); newState.data = data;});
        } else {
          const error = new Error(res.statusText);
          error.res = res;
          throw error;
        }
      })
      .catch(error => { console.log('request failed', error)});
      newState.serverCall = true;
      console.log('profile state: ', state)
      return newState
    default:
      console.log('hit default case: returning state')
    	return state
  }
}
