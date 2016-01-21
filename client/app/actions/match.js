import * as types from '../constants/Match_ActionTypes'

export function saveMatchData(data) {
  return { type: types.SAVE_MATCH_DATA, data }
}

export function sendMessage() {
  return { type: types.SEND_MESSAGE }
}

export function saveInput(value) {
	return { type: types.SAVE_INPUT, value };
}