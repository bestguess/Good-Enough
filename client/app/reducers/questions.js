import { ANSWER_QUESTION } from '../constants/ActionTypes'

const initialState = {
	answers: []
}

export default function questions(state = initialState, action) {
  switch (action.type) {
  	case ANSWER_QUESTION:
  		// Need to fix: Currently mutating state (BAD)
  		console.log('initialState: ', state.answers)
  		state.answers.push(action.answer)
  		console.log('newState: ', state.answers)
  		return state;
    default:
    	return state
  }
}