import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuestionForm from '../components/questionForm'
import * as QuestionActions from '../actions/signup'
import PublicNav from '../components/Nav/PublicNav'
import Footer from '../components/Footer'

class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { state, actions } = this.props
    var nav;
    var h1Content;
    if (this.props.state.signup.viewData.signup.stage0) {
      nav = <PublicNav state={this.props.state} actions={this.props.actions} />
      h1Content = <div className="logo-img"><img className="img-full" src="../client/img/logo.png"/></div>
    } else if (!this.props.state.signup.viewData.signup.stage7) {
      nav = <PublicNav state={this.props.state} actions={this.props.actions} />
      h1Content = "Good Enough"
    }
    return (
      <div>
        {nav}
        <h1 className="logo">{h1Content}</h1>
        <QuestionForm state={state} actions={actions} history={this.props.history}/>
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

