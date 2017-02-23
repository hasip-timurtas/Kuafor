import React, { PropTypes, Component } from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classNames from 'classnames'

class ListCustomerItem extends Component {
  static propTypes = {
    customer: PropTypes.object.isRequired
  }

  render () {
    const { customer } = this.props
    const clientFirstName = customer && customer.forename
    const clientLastName = customer && customer.surname
    return (
      <div className={classNames('list-item')}>
        <Link to={`/customers/${customer._id}`} className='list-item-cell link'>
          <span className='list-title'>{clientFirstName} {clientLastName}</span>
          <span className='supline'>{customer.town}</span>
        </Link>
        <div className='list-item-cell'>
          <span className='supline'>country</span>
          <p>{customer.town}</p>
        </div>
        <div className='list-item-cell max-width300px'>
          <span className='supline'>country</span>
          <p>{customer.country}</p>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ globalData: { currentUser: { user } } }) => ({
    user
  })
)(ListCustomerItem)
