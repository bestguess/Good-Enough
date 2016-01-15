import React, { Component, PropTypes } from 'react'

var QuestionForm = React.createClass({
  render: function() {
    return (
      <div>
        <p>{this.props.questions.question}</p>
      </div>
    );
  }
});


var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Good Enough</h1>
        <QuestionForm questions={this.props.questions} />
      </div>
    );
  }
});


var QUESTIONS = [
  {question: 'Do you like Hank?'},
  {question: 'Do you hate Josh?'},
];
 
ReactDOM.render(
  <App questions={QUESTIONS} />,
  document.getElementById('container')
);