import React, { PropTypes, Component } from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classNames from 'classnames'

class ListClientServiceItem extends Component {
  static propTypes = {
    clientService: PropTypes.object.isRequired
  }

  render () {
    const { clientService } = this.props
    return (
      <div className={classNames('list-item')}>
        <Link to={`/client-services/${clientService._id}`} className='list-item-cell link'>
          <span className='supline'>Name</span>
          <span className='list-title'>{clientService.name}</span>
        </Link>
        <div className='list-item-cell'>
          <span className='supline'>texture</span>
          <p>{clientService.texture}</p>
        </div>
        <div className='list-item-cell max-width300px'>
        <span className='supline'>condition</span>
        <p>{clientService.condition}</p>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ globalData: { currentUser: { user } } }) => ({
    user
  })
)(ListClientServiceItem)
