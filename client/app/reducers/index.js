import { combineReducers } from 'redux'
import * as SignUp_ActionTypes from '../constants/SignUp_ActionTypes'
import * as Login_ActionTypes from '../constants/Login_ActionTypes'
import signup from './signup'
import login from './login'
import profile from './profile'
import { routeReducer } from 'redux-simple-router'

const rootReducer = combineReducers({
	signup,
	login,
	profile,
	routing: routeReducer
})

export default rootReducer
