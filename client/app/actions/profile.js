import * as types from '../constants/Profile_ActionTypes'

export function optimisticProfile(data) {
  console.log('newData: ', data);
	return { type: types.PROFILE, data }
}

// export function profile(data) {
// 	return { type: types.PROFILE, data }
// }

export function optimisticConnect(newData) {
  return { type: types.CONNECT, newData }
}

export function logout() {
	return { type: types.LOGOUT }
}

export function editUserInfo() {
  return { type: types.EDIT_USER_INFO }
}

export function connect(friend) {
  return function (dispatch, getState) {
    var state = getState();
    console.log('state inside connect: ', state)
    console.log('friend to connect to: ', friend);
    fetch('/app/users/connectUrlGoesHere', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(friend)
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          res.json().then(data => {console.log('Server Response after connect: ', data);
            dispatch(optimisticConnect(data));
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

export function profile() {
  return function (dispatch, getState) {
    // Gather User ID and Session Token from Local Storage
    var userData = window.localStorage.getItem('GoodEnough')
    fetch('/app/users/info', {
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
