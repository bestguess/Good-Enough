import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LogInForm from '../components/LogInForm'
import * as LogInActions from '../actions/login'
//import LogIn action here maybe...

class LogIn extends Component {
  render() {
    const { state, actions } = this.props
    var h1Content = <img src="../client/img/logo.png" style={{width: 450 + "px"}}/>
    return (
      <div>
        <h1 className="logo">{h1Content}</h1>
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
