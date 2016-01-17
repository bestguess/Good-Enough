// Required format:
import { SUBMIT_SURVEY_REQUEST,
         SUBMIT_SURVEY_SUCCESS,
         SUBMIT_SURVEY_FAILURE } from '../constants/ActionTypes'


const initialState = {
  // survey: null,
  // fetching: false,
  // fetchingError: null,
  answers: []
};

export default function survey(state = initialState, action = {}) {
  switch (action.type) {
  case SUBMIT_SURVEY_REQUEST:
    console.log('TESTING CASE SUBMIT_SURVEY_REQUEST')
    return Object.assign({}, state, {fetching: true});
  case SUBMIT_SURVEY_SUCCESS:
    return Object.assign({}, state, {
      fetching: false, survey: action.survey
    });
  case SUBMIT_SURVEY_FAILURE:
    return {
      ...state,
      fetching: false,
      survey: null,
      fetchingError: action.error
    };
  default:
    return state;
  }
}
