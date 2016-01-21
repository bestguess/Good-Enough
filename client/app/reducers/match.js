import { MATCH } from '../constants/Match_ActionTypes'

const initialState = {

}

export default function Match(state = initialState, action) {
  switch (action.type) {
    case MATCH:
      return state

    default:
    	return state
  }
}
