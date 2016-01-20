import * as types from '../constants/Profile_ActionTypes'

export function profile() {
	return { type: types.PROFILE }
}

export function logout() {
	return { type: types.LOGOUT }	
}