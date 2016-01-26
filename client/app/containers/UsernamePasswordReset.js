import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UsernamePasswordResetActions from '../actions/usernamePasswordReset'

import PublicNav from '../components/Nav/PublicNav'
import Footer from '../components/Footer'
import UsernamePasswordResetForm from '../components/UsernamePasswordResetForm'

class UsernamePasswordReset extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div>
        <PublicNav state={this.props.state} actions={this.props.actions} />
        <UsernamePasswordResetForm state={this.props.state} actions={this.props.actions}/>
        <Footer state={state} actions={actions} />
      </div>
    );
  }
}

UsernamePasswordReset.PropTypes = {
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
    actions: bindActionCreators(UsernamePasswordResetActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernamePasswordReset)

