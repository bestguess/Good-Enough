import { PROFILE, LOGOUT } from '../constants/Profile_ActionTypes'

const initialState = {
  serverCall: false,
  data: {}
}

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      var newState = Object.assign({}, state)

      // Gather User ID and Session Token from Local Storage
      var userData = window.localStorage.getItem('GoodEnough')

      // Make server request for new signup
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
        if (res.status >= 200 && res.status < 300) {
          res.json().then(data => {console.log('Server Response: ', data); newState.data = data;});
        } else {
          const error = new Error(res.statusText);
          error.res = res;
          throw error;
        }
      })
      .catch(error => { console.log('request failed', error)});
      newState.serverCall = true;
      return newState


    case LOGOUT:
      var newState = Object.assign({}, state)

      // Remove local storage ID and Token
      window.localStorage.removeItem('GoodEnough');

      // Reset Initial Profile State (for if a different user logs on right after logout)
      newState.data = {};
      newState.serverCall = false;
      return newState


    default:
    	return state
  }
}
