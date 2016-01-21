import React, { Component, PropTypes } from 'react'

class Footer extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <footer>
        <span style={{float: 'left'}}>Made in Austin</span>
        <span style={{float: 'right'}}>© Best Guess, Inc.</span>
      </footer>
    )
  }
}

Footer.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Footer