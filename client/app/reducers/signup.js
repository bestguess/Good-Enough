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
      const newObj = {};
      var type = "";
      newObj.IE = 30 - state.userData.answers[3] - state.userData.answers[7] - state.userData.answers[11] + state.userData.answers[15] - state.userData.answers[19] + state.answers[23] + state.answers[27] - state.answers[31];
      newObj.SN = 12 + state.userData.answers[4] + state.userData.answers[8] + state.userData.answers[12] + state.userData.answers[16] + state.userData.answers[20] - state.answers[24] - state.answers[28] + state.answers[32];
      newObj.FT = 30 - state.userData.answers[2] + state.userData.answers[6] + state.userData.answers[10] - state.userData.answers[14] - state.userData.answers[18] + state.answers[22] - state.answers[26] - state.answers[30];
      newObj.JP = 18 + state.userData.answers[1] + state.userData.answers[5] - state.userData.answers[9] + state.userData.answers[13] - state.userData.answers[17] + state.answers[21] - state.answers[25] + state.answers[29];
      type += newObj.IE<24 ? "I" : "E";
      type += newObj.SN<24 ? "S" : "N";
      type += newObj.FT<24 ? "F" : "T";
      type += newObj.JP<24 ? "J" : "P";
      var userData = {
        email: state.userData.email,
        password: state.userData.password,
        firstName: state.UserData.firstname,
        lastName: state.UserData.lastname,
        age: 27,
        gender: state.UserData.gender,
        city: 'austin',
        interests: {discussion:["philosophy","psycology","programming"], activity:["beer","programming","coffee"]},
        type: type,
        personality:{"ie": newObj.IE,"sn": newObj.SN,"ft": newObj.FT,"jp": newObj.JP},
        picture: "https://lh3.googleusercontent.com/-jiPsSN-8cQ8/AAAAAAAAAAI/AAAAAAAAACY/lIAUQ3k6w6A/s120-p-rw-no/photo.jpg",
        places: ["bangers","makersquare","pinthouse pizza","cherrywood coffeehouse","thunderbird coffee","cheer up charlies"],
        matches: []
      }
      fetch('http://localhost:4000/app/users/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) })
        .then(res => {
          console.log(res)
          if (res.status >= 200 && res.status < 300) {
            console.log('original: ', res)
            res.json().then(data => console.log('jsoned: ', data));
          } else {
            const error = new Error(res.statusText);
            error.res = res;
            throw error;
          }
        })
        .catch(error => { console.log('request failed', error); });
      console.log('submitting survey')
      return state
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
      console.log('hit default case: returning state')
    	return state
  }
}
