import { combineReducers } from 'redux'
import * as SignUp_ActionTypes from '../constants/SignUp_ActionTypes'
import * as Login_ActionTypes from '../constants/Login_ActionTypes'
import signup from './signup'
import login from './login'
import profile from './profile'
import match from './match'
import { routeReducer } from 'redux-simple-router'

// The rootReducer combines all reducers into one
const rootReducer = combineReducers({
	signup,
	login,
	profile,
	match,
	routing: routeReducer
})

export default rootReducer
