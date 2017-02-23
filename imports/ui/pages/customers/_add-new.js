import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AutoForm } from 'uniforms-unstyled'
import { TextField, SubmitField } from '/imports/ui/_components/uniforms'
import { Popup } from '/imports/ui/_components/generic'
import Alert from 'react-s-alert'
import { CreateNewCustomer, customerSchema } from '/imports/api/customers/methods'


class AddNew extends Component {
  static propTypes = {
    user: PropTypes.object,
    closePortal: PropTypes.func.isRequired
  }

  customerSchemaa = customerSchema

  handleCreateCustomer (doc) {
    this.customerSchemaa.clean(doc)

    CreateNewCustomer.call(doc, (error, result) => {
      if (error) {
        Alert.error(`Hatay verdi.`)
      } else if (result === 'OK') {
        Alert.success('Customer created successfully.')
        this.props.closePortal()
      }
    })
  }

  render () {
    const { user } = this.props
    return (
      <Popup head='Create new customer' closePortal={this.props.closePortal}>
        <div className="Add-New-Area">
          <AutoForm className="new-clientService" schema={ this.customerSchemaa } onSubmit={ doc => this.handleCreateCustomer(doc) }>
            <div className='popup-body-block content'>
               <div className="row">
                  <TextField name="surname" textPrefix="Surname" />
                </div>
                <div className="row">
                  <TextField name="forename" textPrefix="Forename" />
                </div>
                <div className="row">
                  <TextField name="birthdayDay" textPrefix="Birthday Day" />
                </div>
                <div className="row">
                  <TextField name="birthdayMonth" textPrefix="Month" />
                </div>
                <div className="row">
                  <TextField name="street" textPrefix="Street" />
                </div>
                <div className="row">
                  <TextField name="town" textPrefix="Town" />
                </div>
                <div className="row">
                  <TextField name="country" textPrefix="Country" />
                </div>
                <div className="row">
                  <TextField name="postcode" textPrefix="Post Code" />
                </div>
                <div className="row">
                </div>
            </div>
            <div className='popup-body-block content'>
              <div className="row">
                <SubmitField className="submit button">Create Customer</SubmitField>
              </div>
            </div>
          </AutoForm>
        </div>
      </Popup>
    )
  }
}

export default connect(
  ({ globalData: { currentUser: { user } } }) => ({
    user
  })
)(AddNew)
