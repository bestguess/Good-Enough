import * as types from '../constants/ActionTypes'
import { checkStatus, parseJSON } from './utils'

export function answerQuestion(id, answer) {
	return { type: types.ANSWER_QUESTION, id, answer }
}

function submitSurveyRequest(survey) {
  return {
    type: types.SUBMIT_SURVEY_REQUEST,
    survey
  }
}

function submitSurveySuccess(survey) {
  return {
    type: types.SUBMIT_SURVEY_SUCCESS,
    survey
  }
}

function submitSurveyFailure(survey, error) {
  return {
    type: types.SUBMIT_SURVEY_FAILURE,
    survey,
    error
  }
}

export function submitSurvey(survey) {
  return dispatch => {
    dispatch(submitSurveyRequest(survey))
    console.log('Suvery submitted!: ', survey)

    return fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ survey })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json => dispatch(submitSurveySuccess(survey, json)))
    .catch((error) => {
      const response = error.response
      if (response === undefined) {
        dispatch(submitSurveyFailure(survey, error))
      } else {
        parseJSON(response)
        .then((json) => {
          error.status = response.status
          error.statusText = response.statusText
          error.message = json.message
          dispatch(submitSurveyFailure(survey, error))
        })
      }
    })
  }
}
