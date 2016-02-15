import * as types from '../constants/Login_ActionTypes'
import { routeActions } from 'redux-simple-router'

export function login(tokenData) {
  return { type: types.LOG_IN, tokenData }
}

export function saveLogInInput(input, value) {
  return { type: types.SAVE_LOGIN_INPUT, input, value }
}

export function logInFailed() {
  return { type: types.LOG_IN_FAILED }
}

export function logInRestart() {
  return { type: types.LOG_IN_RESTART }
}

export function demoUser(tokenData) {
  return { type: types.DEMO_USER, tokenData };
}
