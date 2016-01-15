import { ANSWER_QUESTION } from '../constants/ActionTypes'

const initialState = {
	answers: []
}

export default function questions(state = initialState, action) {
  switch (action.type) {
  	case ANSWER_QUESTION:
  		// Need to fix: Currently mutating state (BAD)
  		state.answers[action.id] = action.answer;
  		console.log('State: ', state.answers)
  		return state;
    default:
    	return state
  }
}