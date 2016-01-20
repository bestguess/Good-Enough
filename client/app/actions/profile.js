import * as types from '../constants/Profile_ActionTypes'

export function profile(data) {
	return { type: types.PROFILE, data }
}

export function logout() {
	return { type: types.LOGOUT }	
}