import * as types from '../constants/ActionTypes'

export function answerQuestion(id, answer) {
	return { type: types.ANSWER_QUESTION, id, answer }
}

export function submitSurvey() {
	return { type: types.SUBMIT_SURVEY }
}