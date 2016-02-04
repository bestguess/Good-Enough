import { combineReducers } from 'redux'
import signup from './signup'
import login from './login'
import profile from './profile'
import match from './match'
import usernamePasswordReset from './usernamePasswordReset'
import { routeReducer } from 'redux-simple-router'

// The rootReducer combines all reducers into one
const rootReducer = combineReducers({
	signup,
	login,
	profile,
	match,
  	usernamePasswordReset,
	routing: routeReducer
})

export default rootReducer
