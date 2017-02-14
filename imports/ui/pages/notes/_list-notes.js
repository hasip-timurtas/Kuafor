import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export class ListNotes extends Component {

  static propTypes = {
    notes: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  render () {
    const { user, notes } = this.props
    console.log(notes)
    return (
        <div>
          List Notes
        </div>
      )
  }
}

export default connect(
  ({ globalData: { notes, currentUser: { user } } }) => ({
    notes,
    user
  })
)(ListNotes)
