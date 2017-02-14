import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'


export const LayoutManager = ({
  children
}) => {
  return <div>{children}</div>
}

LayoutManager.propTypes = {
  children: PropTypes.any
}


export default connect(
  ({ globalData: { currentUser: { user } } }) => ({
    user
  })
)(LayoutManager)
