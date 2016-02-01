import * as types from '../constants/Profile_ActionTypes'

export function profile(data) {
	return { type: types.PROFILE, data }
}

export function logout() {
  return { type: types.PROFILE_LOGOUT }
}

export function editUserInfo() {
  return { type: types.EDIT_USER_INFO }
}

export function saveInput(input, value) {
  return { type: types.SAVE_PROFILE_INPUT, input, value };
}

export function deleteInput(input, value) {
  return { type: types.DELETE_PROFILE_INPUT, input, value };
}

export function connectRequest(match_id, action) {
  return { type: types.CONNECT_REQUEST, match_id, action };
}

export function updatePollQuestion(data) {
  return { type: types.UPDATE_POLL_QUESTION, data };
}

