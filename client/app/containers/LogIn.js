import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LogInForm from '../components/LogInForm'
import * as LogInActions from '../actions/login'
import PublicNav from '../components/PublicNav'
//import LogIn action here maybe...

class LogIn extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div>
        <PublicNav state={this.props.state} actions={this.props.actions} />
        <LogInForm state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
};

LogIn.PropTypes = {
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
    actions: bindActionCreators(LogInActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn)
