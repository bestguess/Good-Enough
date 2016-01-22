import * as types from '../constants/Match_ActionTypes'

export function saveMatchData(data) {
  return { type: types.SAVE_MATCH_DATA, data }
}

export function sendMessage(convo) {
  return { type: types.SEND_MESSAGE, convo }
}

export function saveInput(value) {
	return { type: types.SAVE_INPUT, value };
}

export function logout() {
	return { type: types.LOGOUT }
}