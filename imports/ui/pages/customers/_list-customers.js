import React, { Component, PropTypes } from 'react'
import _ from 'underscore'
import { Meteor } from 'meteor/meteor'
import { connect } from 'react-redux'
import { Customers } from '/imports/api/customers/model'
import { ListCustomerItem, CreateCustomer, AddNew } from './'
import Portal from 'react-portal'


const AddButton = () => {
  const addNewCustomer = <a className="button">
    <i className="icon-add-circled left-side-icon"></i>
    Add new Customer
  </a>

  return (
    <div className="utilities-button-wrapper">
      <Portal closeOnEsc openByClickOn={addNewCustomer}>
        <AddNew/>
      </Portal>
    </div>
  )
}


export class ListCustomers extends Component {
  static propTypes = {
    customers: PropTypes.array.isRequired
  }

  render () {
    const {
      customers
    } = this.props

    const selected = 'all'
    const thereAreNoCustomers = customers.length === 0
    return thereAreNoCustomers ? (
      <div className="message-box">
        <div className="message-box-wrapper">
          <div className="message-box-content">
            <div className="message-box-block content">
              <h2>Create a new customer</h2>
              <p>After creating a customer, you’ll be able to create client service record.</p>
              <Portal openByClickOn={
                <a className='button button-green'>
                  <i className='icon-add-circled left-side-icon'/>
                  Create your first customer
                </a>
              }>
                <AddNew />
              </Portal>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="content">
        <div className="section section-tabs">
          <div className="section-body">
            <div className="list-section">
            <AddButton />
                  {customers ? customers.map((customer, index) => (
                          <ListCustomerItem
                            customer={customer}
                            key={customer._id}
                            index={index}
                          />
                    )) : null}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ globalData: { customers, currentUser: { user } } }) => ({
    customers,
    user
  })
)(ListCustomers)
