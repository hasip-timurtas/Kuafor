import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import { Login } from '/imports/ui/pages/accounts'
import _ from 'underscore'

export const LayoutManager = ({
  children,
  user
}) => {
  const publicPathnames = [
    '/signup',
    '/reset-password',
    '/verify-password-reset',
    '/verify-email-address'
  ]

  function pathIsPublic () {
    return _.some(publicPathnames, publicPathName => window.location.pathname.toLowerCase() === publicPathName.toLowerCase())
  }

  return (!user && !pathIsPublic()) ? <Login/> : children
}

LayoutManager.propTypes = {
  children: PropTypes.any,
  user: PropTypes.object
}


export default connect(
  ({ globalData: { currentUser: { user } } }) => ({
    user
  })
)(LayoutManager)
