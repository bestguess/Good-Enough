import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as QuestionActions from '../actions/questions'

class QuestionForm extends Component {
  render() {
    return (
      <div>
        <p>This is where the question would go</p>
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


var QUESTIONS = [
  {question: 'Do you like Hank?', answered: false },
  {question: 'Do you hate Josh?', answered: false },
];

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.questions
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