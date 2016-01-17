import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuestionForm from '../components/questionForm'
import * as QuestionActions from '../actions/questions'

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
