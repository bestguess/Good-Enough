import React, { Component, PropTypes } from 'react'
import QuestionBox from './QuestionBox'

// Personality Test Questions
const stage1 = [
  {id: 1, option1: 'makes lists', option2: 'relies on memory'},
  {id: 2, option1: 'skeptical', option2: 'wants to believe'},
  {id: 3, option1: 'bored by time alone', option2: 'needs time alone'},
  {id: 4, option1: 'accepts things as they are', option2: 'unsatisfied with the ways things are'},
  {id: 5, option1: 'keeps a clean room', option2: 'just puts stuff where ever'},
  {id: 6, option1: 'thinks "robotic" is an insult ', option2: 'strives to have a mechanical mind'},
  {id: 7, option1: 'energetic', option2: 'mellow'},
  {id: 8, option1: 'prefer to take multiple choice test', option2: 'prefer essay answers'}
  ]
const stage2 = [
  {id: 9, option1: 'chaotic', option2: 'organized'},
  {id: 10, option1: 'easily hurt', option2: 'thick-skinned'},
  {id: 11, option1: 'works best in groups', option2: 'works best alone'},
  {id: 12, option1: 'focused on the present ', option2: 'focused on the future'},
  {id: 13, option1: 'plans far ahead', option2: 'plans at the last minute'},
  {id: 14, option1: "wants people's respect", option2: 'wants their love'},
  {id: 15, option1: 'gets worn out by parties', option2: 'gets fired up by parties'},
  {id: 16, option1: 'fits in', option2: 'stands out'}
  ]
const stage3 = [
  {id: 17, option1: 'keeps options open', option2: 'commits'},
  {id: 18, option1: 'wants to be good at fixing things', option2: 'wants to be good at fixing people'},
  {id: 19, option1: 'talks more', option2: 'listens more'},
  {id: 20, option1: 'when describing an event, will tell people what happened', option2: 'when describing an event, will tell people what it meant'},
  {id: 21, option1: 'gets work done right away', option2: 'procrastinates'},
  {id: 22, option1: 'follows the heart', option2: 'follows the head'},
  {id: 23, option1: 'stays at home', option2: 'goes out on the town'},
  {id: 24, option1: 'wants the big picture', option2: 'wants the details'}
]
const stage4 = [
  {id: 25, option1: 'improvises', option2: 'prepares'},
  {id: 26, option1: 'bases morality on justice', option2: 'bases morality on compassion'},
  {id: 27, option1: 'finds it difficult to yell very loudly', option2: 'yelling to others when they are far away comes naturally'},
  {id: 28, option1: 'believes theories', option2: 'needs evidence'},
  {id: 29, option1: 'works hard', option2: 'plays hard'},
  {id: 30, option1: 'uncomfortable with emotions', option2: 'values emotions'},
  {id: 31, option1: 'likes to perform in front of other people', option2: 'avoids public speaking'},
  {id: 32, option1: 'likes to know "who?", "what?", "when?"', option2: 'likes to know "why?"'}
]

class PersonalityTest extends Component {
  render() {
    var title;
    if (this.props.state.signup.viewData.signup.stage1) {
      title = stage1
    } else if (this.props.state.signup.viewData.signup.stage2) {
      title = stage2
    } else if (this.props.state.signup.viewData.signup.stage3) {
      title = stage3
    } else if (this.props.state.signup.viewData.signup.stage4) {
      title = stage4
    }
    return (
      <div className="question-form">
        {title.map(question =>
              <QuestionBox key={question.id} data={question} state={this.props.state} actions={this.props.actions} />
          )}
      </div>
    )
  }
}

PersonalityTest.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PersonalityTest

