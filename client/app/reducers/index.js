import { combineReducers } from 'redux'
import * as SignUp_ActionTypes from '../constants/SignUp_ActionTypes'
import * as Login_ActionTypes from '../constants/Login_ActionTypes'
import questions from './questions'
import { routeReducer } from 'redux-simple-router'

const rootReducer = combineReducers({
	questions,
	routing: routeReducer
})

export default rootReducer
