import React, { Component, PropTypes } from 'react'


class QuestionForm extends Component {
  render: function() {
    return (
      <div>
        {this.props.questions.map(question =>
          <p>{question.question}</p>
        )}
      </div>
    );
  }
};

class App extends Component {
  render: function() {
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
 
ReactDOM.render(
  <App questions={QUESTIONS} />,
  document.getElementById('root')
);