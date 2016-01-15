import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as QuestionActions from '../actions/questions'

const QUESTIONS = [
  {id: 1, question: 'Do you like Hank?', answered: false },
  {id: 2, question: 'Do you hate Josh?', answered: false },
  {id: 3, question: 'Does Ivan smell?', answered: false },
  {id: 4, question: 'Does Paolinni like ghosts?', answered: false },
];

class QuestionForm extends Component {
  render() {
    const title = QUESTIONS
    return (
      <div>
        {title.map(question =>
            <p key={question.id}>{question.question}</p>
        )}
      </div>
    )
  }
};

class App extends Component {
  render() {
    const { questions, actions } = this.props
    return (
      <div>
        <h1>Good Enough</h1>
        <QuestionForm questions={this.props.questions} />
      </div>
    );
  }
};

App.propTypes = {
  questions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    questions: state.questions
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