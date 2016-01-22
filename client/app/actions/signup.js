import * as types from '../constants/SignUp_ActionTypes'
import { routeActions } from 'redux-simple-router'

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

export function optimisticRedirectToLogIn() {
  return { type: types.REDIRECT_TO_LOGIN }
}

export function redirectToLogIn() {
  return function (dispatch, getState) {
    var state = getState();
    console.log('currState: ', state);
    dispatch(routeActions.push('/login'))
    dispatch(optimisticRedirectToLogIn())
  }
  return null;
}
