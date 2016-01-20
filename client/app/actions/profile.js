import * as types from '../constants/Profile_ActionTypes'

export function optimisticProfile(newData) {
  console.log('newData: ', newData);
	return { type: types.PROFILE, newData }
}

export function logout() {
	return { type: types.LOGOUT }
}

export function profile() {
  return function (dispatch, getState) {
    // Gather User ID and Session Token from Local Storage
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
        if (res.status >= 200 && res.status < 300) {
          res.json().then(data => {console.log('Server Response: ', data);
            dispatch(optimisticProfile(data));
          });
        } else {
          const error = new Error(res.statusText);
          error.res = res;
          throw error;
        }
      })
      .catch(error => { console.log('request failed', error)});
  }
  return null;
}
