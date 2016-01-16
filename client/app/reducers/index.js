import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes'
import questions from './questions'

const rootReducer = combineReducers({
	questions
})

export default rootReducer
