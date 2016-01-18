import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/ActionTypes'
import questions from './questions'
import { routeReducer } from 'redux-simple-router'

const rootReducer = combineReducers({
	questions,
	routing: routeReducer
})

export default rootReducer
