import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as QuestionActions from '../actions/questions'

const QUESTIONS = [
  {id: 1, option1: 'makes lists', option2: 'relies on memory', answered: false },
  {id: 2, option1: 'sceptical', option2: 'wants to believe', answered: false },
  {id: 3, option1: 'bored by time alone', option2: 'needs time alone', answered: false },
  {id: 4, option1: 'accepts things as they are', option2: 'unsatisfied with the ways things are', answered: false },
  {id: 5, option1: 'keeps a clean room', option2: 'just puts stuff where ever', answered: false },
  {id: 6, option1: 'thinks "robotic" is an insult ', option2: 'strives to have a mechanical mind', answered: false },
  {id: 7, option1: 'energetic', option2: 'mellow', answered: false },
  {id: 8, option1: 'prefer to take multiple choice test', option2: 'prefer essay answers', answered: false },
  {id: 9, option1: 'chaotic', option2: 'organized', answered: false },
  {id: 10, option1: 'easily hurt', option2: 'thick-skinned', answered: false },
  {id: 11, option1: 'works best in groups', option2: 'works best alone', answered: false },
  {id: 12, option1: 'focused on the present ', option2: 'focused on the future', answered: false },
  {id: 13, option1: 'plans far ahead', option2: 'plans at the last minute', answered: false },
  {id: 14, option1: "wants people's respect", option2: 'wants their love', answered: false },
  {id: 15, option1: 'gets worn out by parties', option2: 'gets fired up by parties', answered: false },
  {id: 16, option1: 'fits in', option2: 'stands out', answered: false },
  {id: 17, option1: 'keeps options open', option2: 'commits', answered: false },
  {id: 18, option1: 'wants to be good at fixing things', option2: 'wants to be good at fixing people', answered: false },
  {id: 19, option1: 'talks more', option2: 'listens more', answered: false },
  {id: 20, option1: 'when describing an event, will tell people what happened', option2: 'when describing an event, will tell people what it meant', answered: false },
  {id: 21, option1: 'gets work done right away', option2: 'procrastinates', answered: false },
  {id: 22, option1: 'follows the heart', option2: 'follows the head', answered: false },
  {id: 23, option1: 'stays at home', option2: 'goes out on the town', answered: false },
  {id: 24, option1: 'wants the big picture', option2: 'wants the details', answered: false },
  {id: 25, option1: 'improvises', option2: 'prepares', answered: false },
  {id: 26, option1: 'bases morality on justice', option2: 'bases morality on compassion', answered: false },
  {id: 27, option1: 'finds it difficult to yell very loudly', option2: 'yelling to others when they are far away comes naturally', answered: false },
  {id: 28, option1: 'theoretical', option2: 'empirical', answered: false },
  {id: 29, option1: 'works hard', option2: 'plays hard', answered: false },
  {id: 30, option1: 'uncomfortable with emotions', option2: 'values emotions', answered: false },
  {id: 31, option1: 'likes to perform in front of other people', option2: 'avoids public speaking', answered: false },
  {id: 32, option1: 'likes to know "who?", "what?", "when?"', option2: 'likes to know "why?"', answered: false }
];

class QuestionButtons extends Component {
  render() {
    return (
      <span style={{float:'left', textAlign:'center', width:'20%'}}>
        <ul className="question-buttons">
          <li>
            <input id="1" onClick={() => this.props.answer(this.props.choices[0])} type='radio' value='1' />
            <label>1</label> 
          </li>
          <li>
            <input id="2" onClick={() => this.props.answer(this.props.choices[1])} type='radio' value='2' />
            <label>2</label>
          </li>
          <li>
            <input id="2" onClick={() => this.props.answer(this.props.choices[2])} type='radio' value='3' />
            <label>3</label>
          </li>
          <li>
            <input id="2" onClick={() => this.props.answer(this.props.choices[3])} type='radio' value='4' />
            <label>4</label>
          </li>
          <li>
            <input id="2" onClick={() => this.props.answer(this.props.choices[4])} type='radio' value='5' />
            <label>5</label>
          </li>
        </ul>
      </span>
    )
  }
};

class QuestionBox extends Component {

  testFunction(choice) {
    this.props.actions.answerQuestion(this.props.data.id, choice)
  }

  render() {
    return (
      <div className="question">
        <span className="question-option" style={{float:'left', textAlign:'right'}}>{this.props.data.option1}</span>
        <QuestionButtons state={this.props.state} actions={this.props.actions} choices={[1, 2, 3, 4, 5]} answer={this.testFunction.bind(this)}/>
        <span className="question-option" style={{float:'right', textAlign:'left'}}>{this.props.data.option2}</span>
      </div>
    )
  }  
};

class QuestionForm extends Component {
  render() {
    const title = QUESTIONS
    return (
      <div className="question-form">
        {title.map(question =>
            <QuestionBox key={question.id} data={question} state={this.props.state} actions={this.props.actions} />
        )}
        <button onClick={this.props.actions.submitSurvey} >Submit</button>
      </div>
    )
  }
};

class App extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div>
        <h1 className="logo"><img src="../client/img/logo.png" style={{width: 450 + "px"}}/></h1>
        <QuestionForm state={state} actions={actions} />
      </div>
    );
  }
};

App.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuestionActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)