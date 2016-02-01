import React, { Component, PropTypes } from 'react'

class Banner extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <banner>
        <img className="banner-img" src="../client/img/banner.jpg"/>
      </banner>
    )
  }
}

Banner.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Banner