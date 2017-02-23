import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { CreateNewCustomer, customerSchema, deleteCustomer } from '/imports/api/customers/methods'
import _ from 'underscore'
import Portal from 'react-portal'
import { ListClientServiceItem, AddNew } from '/imports/ui/pages/clientServices/'
import { DeleteRecord } from '/imports/ui/_components/generic'

const AddButton = ({ customerId }) => {
  const addNewCustomer = <a className="button">
    <i className="icon-add-circled left-side-icon"></i>
    Add new client service
  </a>

  return (
    <div className="utilities-button-wrapper">
      <Portal closeOnEsc openByClickOn={addNewCustomer}>
         <AddNew customerId={customerId} />
      </Portal>
    </div>
  )
}


export class Customer extends Component {

  static propTypes = {
    user: PropTypes.object
  }

  customerSchemaa = customerSchema

  handleRemove () {
    const { currentCustomer: { _id } } = this.props
    console.log(_id)
    deleteCustomer.call({ _id }, (error) => {
      if (error) {
        Alert.error(error.reason || error.message || error.details)
      } else {
        Alert.success('Customer is successfully deleted.')
      }
    })
  }


  render () {
    const { user, currentCustomer, customerClientServices } = this.props
    const thereAreNoClientServices = customerClientServices.length === 0

    if (!currentCustomer) return <h2> Customer could not find. </h2>

    const optionsDeleteRecord = {
      handleDelete: ::this.handleRemove,
      description: 'All customer data such as client record services will be permanently deleted.',
      strongArea: `Are you sure you want to delete ${currentCustomer.forename}`
    }

    return (
      <div className="new-clientService-area">
            <h1> Customer Information</h1>
            <AutoForm className="new-clientService" schema={ this.customerSchemaa } onSubmit={ doc => this.handleCreateCustomer(doc) }>
              <div className="row">
                <div className="col-md-3">
                  <TextField name="surname" textPrefix="Surname" value={currentCustomer.surname} />
                </div>
                <div className="col-md-3">
                  <TextField name="forename" textPrefix="Forename" value={currentCustomer.forename} />
                </div>
                <div className="col-md-3">
                  <TextField name="birthdayDay" textPrefix="Birthday Day" value={currentCustomer.birthdayDay} />
                </div>
                <div className="col-md-3">
                  <TextField name="birthdayMonth" textPrefix="Month" value={currentCustomer.birthdayMonth} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <TextField name="street" textPrefix="Street" value={currentCustomer.street} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <TextField name="town" textPrefix="Town" value={currentCustomer.town} />
                </div>
                <div className="col-md-3">
                  <TextField name="country" textPrefix="Country" value={currentCustomer.country} />
                </div>
                <div className="col-md-3">
                  <TextField name="postcode" textPrefix="Post Code" value={currentCustomer.postcode} />
                </div>
                <div className="col-md-3">
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                    <Portal head='Create new customer' closeOnEsc openByClickOn={<a className='button button-faint button-red'>Delete Customer</a>}>
                          <DeleteRecord {...optionsDeleteRecord} />
                    </Portal>
                </div>
              </div>
            </AutoForm>
            {thereAreNoClientServices ? (
              <div className="message-box message-box-customer">
                <div className="message-box-wrapper">
                  <div className="message-box-content">
                    <div className="message-box-block content">
                      <h2>Create a new Client Service</h2>
                      <p>After creating a customer, you’ll be able to create client service record.</p>
                      <Portal openByClickOn={
                        <a className='button button-green'>
                          <i className='icon-add-circled left-side-icon'/>
                          Create your first client service record
                        </a>
                      }>
                        <AddNew customerId={currentCustomer._id} />
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
                    <AddButton customerId={currentCustomer._id} />
                          {customerClientServices ? customerClientServices.map((clientService, index) => (
                                  <ListClientServiceItem
                                    clientService={clientService}
                                    key={clientService._id}
                                    index={index}
                                  />
                            )) : null}
                        </div>
                    </div>
                </div>
              </div>
            )}
        </div>
    )
  }
}

export default connect(
  ({ globalData: { customers, clientServices, currentUser: { user } } }, ownProps) => ({
    customerClientServices: clientServices.filter(cs => cs.customerId === ownProps.params.customerId),
    user,
    currentCustomer: customers.find(c => c._id === ownProps.params.customerId)
  })
)(Customer)
