import * as types from '../constants/Login_ActionTypes'

export function logIn() {
	return { type: types.LOG_IN }
}

export function saveLogInInput(input, value) {
  return { type: types.SAVE_LOGIN_INPUT, input, value }
}
