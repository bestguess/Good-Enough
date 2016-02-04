import * as types from '../constants/Match_ActionTypes'

export function saveMatchData(match_id, data, profile_matches) {
  return { type: types.SAVE_MATCH_DATA, match_id, data, profile_matches }
}

export function updateConvo(convo) {
  return { type: types.UPDATE_CONVO, convo }
}

export function saveInput(value) {
	return { type: types.SAVE_INPUT, value };
}

export function logout() {
	return { type: types.MATCH_LOGOUT }
}

export function clearCurrentMatchData() {
	return { type: types.CLEAR_CURRENT_MATCH_DATA }
}