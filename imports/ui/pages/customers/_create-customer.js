import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { CreateNewCustomer, customerSchema } from '/imports/api/customers/methods'


export class CreateCustomer extends Component {

  static propTypes = {
    user: PropTypes.object
  }

  customerSchemaa = customerSchema

  handleCreateCustomer (doc) {
    this.customerSchemaa.clean(doc)

    CreateNewCustomer.call(doc, (error, result) => {
      if (error) {
        Alert.error(`Hatay verdi.`)
      } else if (result === 'OK') {
        Alert.success('Customer created successfully.')
      }
    })
  }

  render () {
    const { user } = this.props
    return (
      <div className="new-clientService-area">
            <h1> Create New Customer</h1>
            <AutoForm className="new-clientService" schema={ this.customerSchemaa } onSubmit={ doc => this.handleCreateCustomer(doc) }>
              <div className="row">
                <div className="col-md-3">
                  <TextField name="surname" textPrefix="Surname" />
                </div>
                <div className="col-md-3">
                  <TextField name="forename" textPrefix="Forename" />
                </div>
                <div className="col-md-3">
                  <TextField name="birthdayDay" textPrefix="Birthday Day" />
                </div>
                <div className="col-md-3">
                  <TextField name="birthdayMonth" textPrefix="Month" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <TextField name="street" textPrefix="Street" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <TextField name="town" textPrefix="Town" />
                </div>
                <div className="col-md-3">
                  <TextField name="country" textPrefix="Country" />
                </div>
                <div className="col-md-3">
                  <TextField name="postcode" textPrefix="Post Code" />
                </div>
                <div className="col-md-3">
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <SubmitField className="submit button">Create Customer</SubmitField>
                </div>
              </div>
            </AutoForm>
            <div className="fieldset project-duedate fieldset-stripped">
              <div className="fieldset-content has-element-left">
                <div className="rdt ">
                  Create Customer
                </div>
              </div>
            </div>
        </div>
    )
  }
}

export default connect(
  ({ globalData: { clientServices, currentUser: { user } } }) => ({
    clientServices,
    user
  })
)(CreateCustomer)
