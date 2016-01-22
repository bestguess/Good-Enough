import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuestionForm from '../components/questionForm'
import * as QuestionActions from '../actions/signup'
import PublicNav from '../components/PublicNav'
import Footer from '../components/Footer'
import { routeActions } from 'redux-simple-router'

class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { state, actions } = this.props
    console.log(this)
    var h1Content;
    var loginButton;

    if (this.props.state.signup.viewData.signup.stage0) {
     loginButton = <button onClick={() => {this.props.actions.redirectToLogIn()}} className="start-test">Login</button>
    } else {
      loginButton = null;
    }

    if (this.props.state.signup.viewData.signup.stage0) {
      h1Content = <div className="logo-img"><img src="../client/img/logo.png"/></div>
    } else {
      h1Content = "Good Enough"
    }


    return (
      <div>
        <PublicNav state={this.props.state} actions={this.props.actions} />
        <h1 className="logo">{h1Content}</h1>
        <QuestionForm state={state} actions={actions} history={this.props.history}/>
        <div className="question-form-submit-button">
        {loginButton}
        </div>
        <Footer state={state} actions={actions} />
      </div>
    );
  }
};

SignUp.propTypes = {
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
)(SignUp)

