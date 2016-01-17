import { combineReducers } from 'redux'
import questions from './questions'
import survey from './survey'

const rootReducer = combineReducers({
  questions,
  survey
})

export default rootReducer
