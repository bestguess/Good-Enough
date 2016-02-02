import * as types from '../constants/SignUp_ActionTypes'
import { routeActions } from 'redux-simple-router'

export function answerQuestion(id, answer) {
	return { type: types.ANSWER_QUESTION, id, answer }
}

export function saveInput(input, value) {
	return { type: types.SAVE_INPUT, input, value };
}

export function deleteInput(input, value) {
	return { type: types.DELETE_INPUT, input, value };
}

export function submitSurvey(tokenData) {
	return { type: types.SUBMIT_SURVEY, tokenData };
}

export function continueSurvey() {
	return { type: types.CONTINUE_SURVEY };
}

export function surveyError() {
	return { type: types.SURVEY_ERROR };
}

export function demoUser() {
	return { type: types.DEMO_USER };
}

