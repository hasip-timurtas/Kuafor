import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export class ListClientServices extends Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  render () {
    const { currentUser: { user, masterProfile }, clientServices } = this.props
    console.log(clientServices)
    console.log(user)
    console.log(masterProfile)
    return (
        <div>
          List ClientServices
        </div>
    )
  }
}

export default connect(
  ({ globalData: { clientServices, currentUser } }) => ({
    clientServices,
    currentUser
  })
)(ListClientServices)
