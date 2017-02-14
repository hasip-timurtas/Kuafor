import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export class MainLayout extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    children: PropTypes.any
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { children, currentUser: { user } } = this.props
    return (
      <div>
        <Link to="/notes">Notes </Link> <br />
        <Link to="/notes/create-note">Create Note </Link> <br />
        Main Layout
          {children}
      </div>
    )
  }
}

export default connect(
  ({ globalData: {
    currentUser
  }
}) => ({
  currentUser
}))(MainLayout)
