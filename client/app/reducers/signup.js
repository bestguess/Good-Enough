import { ANSWER_QUESTION, SAVE_INPUT, SUBMIT_SURVEY, CONTINUE_SURVEY } from '../constants/SignUp_ActionTypes'

const initialState = {
  check: false,
  viewData: {
    signup: {
      stage0: true,
      stage1: false,
      stage2: false,
      stage3: false,
      stage4: false,
      stage5: false
    }
  },
  userData: {
    email: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined,
    gender: undefined,
    birthday: {},
  	answers: []
  }
}

/////////////
// Need to fix: Currently mutating state (BAD PRACTICE)
/////////////
export default function SignUp(state = initialState, action) {
  switch (action.type) {
    case ANSWER_QUESTION:
      var newState = Object.assign({}, state)
      newState.userData.answers[action.id] = action.answer
  		return newState


    case SAVE_INPUT:
      if(action.input === "DOBMonth") {
        state.userData.birthday.month = action.value
      } else if (action.input === "DOBDay") {
        state.userData.birthday.day = action.value
      } else if (action.input === "DOBYear") {
        state.userData.birthday.year = action.value
      } else {
        state.userData[action.input] = action.value
      }
      return state


    case SUBMIT_SURVEY:
      window.localStorage.setItem('GoodEnough', JSON.stringify(action.tokenData))
      var newState = Object.assign({}, state)
      newState.check = true;

      // Reset signup stages for if user logs out in current session
      newState.viewData.signup.stage0 = true;
      newState.viewData.signup.stage1 = false;
      newState.viewData.signup.stage2 = false;
      newState.viewData.signup.stage3 = false;
      newState.viewData.signup.stage4 = false;
      newState.viewData.signup.stage5 = false;
      return newState


    case CONTINUE_SURVEY:
      var newState = Object.assign({}, state)
      if (newState.viewData.signup.stage0) {
        newState.viewData.signup.stage0 = false;
        newState.viewData.signup.stage1 = true;
      } else if (state.viewData.signup.stage1) {
        newState.viewData.signup.stage1 = false;
        newState.viewData.signup.stage2 = true;
      } else if (state.viewData.signup.stage2) {
        newState.viewData.signup.stage2 = false;
        newState.viewData.signup.stage3 = true;
      } else if (state.viewData.signup.stage3) {
        newState.viewData.signup.stage3 = false;
        newState.viewData.signup.stage4 = true;
      } else if (state.viewData.signup.stage4) {
        newState.viewData.signup.stage4 = false;
        newState.viewData.signup.stage5 = true;
      }
      return newState


    default:
    	return state
  }
}
