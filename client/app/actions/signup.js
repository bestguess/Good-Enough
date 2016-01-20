import * as types from '../constants/SignUp_ActionTypes'

export function answerQuestion(id, answer) {
	return { type: types.ANSWER_QUESTION, id, answer }
}

export function saveInput(input, value) {
	return { type: types.SAVE_INPUT, input, value };
}

export function submitSurvey(tokenData) {
	return { type: types.SUBMIT_SURVEY, tokenData };
}

export function continueSurvey() {
	return { type: types.CONTINUE_SURVEY };
}
