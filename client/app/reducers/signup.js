import { ANSWER_QUESTION, SAVE_INPUT, SUBMIT_SURVEY, CONTINUE_SURVEY } from '../constants/SignUp_ActionTypes'

const initialState = {
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
    picture: null,
    birthday: {},
  	answers: {},
    clearForSubmit: false
  },
  validationChecks: {
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
    clearForSubmit: false
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
      // Validation Checks
      var x = newState.userData
      var y = newState.validationChecks
      var a = x.answers
      if (!y.stage1) {
        if (a[1] && a[2] && a[3] && a[4] && a[5] && a[6] && a[7] && a[8]) y.stage1 = true;
      } else if (!y.stage2) {
        if (a[9] && a[10] && a[11] && a[12] && a[13] && a[14] && a[15] && a[16]) y.stage2 = true;
      } else if (!y.stage3) {
        if (a[17] && a[18] && a[19] && a[20] && a[21] && a[22] && a[23] && a[24]) y.stage3 = true;
      } else if (!y.stage4) {
        if (a[25] && a[26] && a[27] && a[28] && a[29] && a[30] && a[31] && a[32]) y.stage4 = true;
      }
  		return newState



    case SAVE_INPUT:
      var newState = Object.assign({}, state)
      if(action.input === "DOBMonth") {
        newState.userData.birthday.month = action.value
      } else if (action.input === "DOBDay") {
        newState.userData.birthday.day = action.value
      } else if (action.input === "DOBYear") {
        newState.userData.birthday.year = action.value
      } else {
        newState.userData[action.input] = action.value
      }
      // Validation Checks
      var x = newState.userData
      var y = newState.validationChecks
      var bdLength = Object.keys(x.birthday).length
      if (x.email && x.password && x.firstname && x.lastname && x.gender && bdLength === 3) y.clearForSubmit = true;
      return newState



    case SUBMIT_SURVEY:
      var newState = Object.assign({}, state)
      // Set token data into local storage
      window.localStorage.setItem('GoodEnough', JSON.stringify(action.tokenData))
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
