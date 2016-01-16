import { CALL_API, Schemas } from '../middleware/api'
import * as types from '../constants/ActionTypes'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `users/${login}`,
      schema: Schemas.USER
    }
  }
}


export function answerQuestion(id, answer) {
	return { type: types.ANSWER_QUESTION, id, answer }
}

export function submitSurvey() {
	return { type: types.SUBMIT_SURVEY }
}
