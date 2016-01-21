import { SAVE_MATCH_DATA, SAVE_INPUT, SEND_MESSAGE } from '../constants/Match_ActionTypes'

const initialState = {

}

export default function Match(state = initialState, action) {
  switch (action.type) {
  	case SAVE_MATCH_DATA:
    	var newState = Object.assign({}, state)
    	newState.data = action.data
     	return newState


	case SAVE_INPUT:
		var newState = Object.assign({}, state)
		newState.message = action.value
		return newState


    case SEND_MESSAGE:
    	console.log('sending message: ', state.message)
    	return state


    default:
    	return state
  }
}
