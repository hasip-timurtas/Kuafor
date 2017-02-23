import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { CreateNewCustomer, customerSchema, deleteCustomer } from '/imports/api/customers/methods'
import _ from 'underscore'
import Portal from 'react-portal'
import { ListClientServices, ListClientServiceItem, AddNew } from '/imports/ui/pages/clientServices/'
import { DeleteRecord } from '/imports/ui/_components/generic'

const AddButton = ({ customerId }) => {
  const addNewClientService = <a className="button">
    <i className="icon-add-circled left-side-icon"></i>
    Add new client service
  </a>

  return (
    <div className="utilities-button-wrapper">
      <Portal closeOnEsc openByClickOn={addNewClientService}>
         <AddNew customerId={customerId} />
      </Portal>
    </div>
  )
}

export class Customer extends Component {

  static propTypes = {
    currentCustomer: PropTypes.object
  }

  customerSchemaa = customerSchema

  handleRemove () {
    const { currentCustomer: { _id } } = this.props
    deleteCustomer.call({ _id }, (error) => {
      if (error) {
        Alert.error(error.reason || error.message || error.details)
      } else {
        Alert.success('Customer is successfully deleted.')
      }
    })
  }

  render () {
    const { currentCustomer } = this.props

    if (!currentCustomer) return <h2> Customer could not find. </h2>

    const optionsDeleteRecord = {
      handleDelete: ::this.handleRemove,
      description: 'All customer data such as client record services will be permanently deleted.',
      strongArea: `Are you sure you want to delete ${currentCustomer.forename}`
    }


    const {
        surname,
        forename,
        birthdayDay,
        birthdayMonth,
        street,
        town,
        country,
        postcode,
        telephoneHome,
        work
      } = currentCustomer

    return (
      <div className='section'>
          <a className="back-button" onClick={browserHistory.goBack} ><span> <i className="icon-chevron-left"> </i> Back</span></a>
                <h1> Customer </h1>
                <div className='section-body'>
                  <div className='section-body-block content client-service-detail'>
                    <div className='blocks-section selectable-text'>
                      {surname && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>Surname</span>
                            {surname}
                        </div>
                      )}
                      {forename && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>Forename</span>
                            {forename}
                        </div>
                      )}
                      {birthdayDay && birthdayMonth && (
                        <div className='fieldset-stripped'>
                            <p className="font-blue">birthday</p>
                            <span className='supline none-clickable'>Day</span>
                            {birthdayDay}
                            <span className='supline none-clickable'>Month</span>
                            {birthdayMonth}
                        </div>
                      )}
                      {street && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>Street</span>
                            {street}
                        </div>
                      )}
                      {town && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>Town</span>
                            {town}
                        </div>
                      )}
                      {country && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>Country</span>
                            {country}
                        </div>
                      )}
                      {postcode && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>Post Code</span>
                            {postcode}
                        </div>
                      )}
                      {telephoneHome && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>TelephoneHome</span>
                            {telephoneHome}
                        </div>
                      )}
                      {work && (
                        <div className='fieldset-stripped'>
                            <span className='supline none-clickable'>Work</span>
                            {work}
                        </div>
                      )}
                      <div className='fieldset-stripped'>
                        <Portal head='Create new customer' closeOnEsc openByClickOn={
                          <a className='button button-faint button-red'>Delete Customer</a>
                        }>
                          <DeleteRecord {...optionsDeleteRecord} />
                        </Portal>
                      </div>
                    </div>
                  </div>
              </div>
              <ListClientServices customerId={currentCustomer._id} />
        </div>
    )
  }
}

export default connect(
  ({ globalData: { customers } }, ownProps) => ({
    currentCustomer: customers.find(c => c._id === ownProps.params.customerId)
  })
)(Customer)
