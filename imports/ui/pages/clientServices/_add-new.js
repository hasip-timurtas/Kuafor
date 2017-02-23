import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { Popup } from '/imports/ui/_components/generic'
import { HiddenField, TextField, SubmitField, ReactSelectField, DateTimePickerField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { CreateNewClientService, clientServiceSchema } from '/imports/api/clientServices/methods'

class AddNew extends Component {
  static propTypes = {
    user: PropTypes.object,
    closePortal: PropTypes.func.isRequired
  }

  clientServiceSchemaa = clientServiceSchema

  handleCreateClientService (doc) {
    this.clientServiceSchemaa.clean(doc)

    CreateNewClientService.call(doc, (error, result) => {
      if (error) {
        Alert.error(`Error during Client Service creation. Please try again later.`)
      } else if (result === 'OK') {
        Alert.error(`Client Service has been added successfully.`)
      }
    })
  }

  render () {
    const { user, customerId } = this.props
    const textures = [
      {
        value: 'Fine',
        label: 'Fine'
      },
      {
        value: 'Avarage',
        label: 'Avarage'
      },
      {
        value: 'Coarse',
        label: 'Coarse'
      }]

    const conditions = [
      {
        value: 'Dry',
        label: 'Dry'
      },
      {
        value: 'Normal',
        label: 'Normal'
      },
      {
        value: 'Oily',
        label: 'Oily'
      }]

    const naturalForms = [
      {
        value: 'Straight',
        label: 'Straight'
      },
      {
        value: 'Wavy',
        label: 'Wavy'
      },
      {
        value: 'Curly',
        label: 'Curly'
      }]

    const existingHairTreatments = [
      {
        value: 'Perm',
        label: 'Perm'
      },
      {
        value: 'Relaxer',
        label: 'Relaxer'
      },
      {
        value: 'Highlighted',
        label: 'Highlighted'
      },
      {
        value: 'Bleach',
        label: 'Bleach'
      },
      {
        value: 'Tint',
        label: 'Tint'
      },
      {
        value: 'Semi',
        label: 'Semi'
      }]
    return (
      <Popup head='New client service record' closePortal={this.props.closePortal}>
        <div className="Add-New-Area popup-body-block content">
          <AutoForm className="new-clientService" schema={ this.clientServiceSchemaa } onSubmit={ doc => this.handleCreateClientService(doc) }>
              <HiddenField name="customerId" value={customerId} />
              <div className="row">
                <TextField name="name" textPrefix="Record Name" />
              </div>
              <div className="row">
                <div className="section-head-header contenth2"><h2>Texture</h2></div>
              </div>
              <div className="row">
                <ReactSelectField
                  name='texture'
                  placeholder='Select Texture'
                  options={textures}
                  noResultsText="No texture found"
                />
              </div>
              <div className="row">
                <div className="section-head-header contenth2"><h2>Condition</h2></div>
              </div>
              <div className="row">
                <ReactSelectField
                  name='condition'
                  placeholder='Select Condition'
                  options={conditions}
                  noResultsText="No Condition found"
                />
              </div>
              <div className="row">
                <div className="section-head-header contenth2"><h2>Natural Form</h2></div>
              </div>
              <div className="row">
                <ReactSelectField
                  name='naturalForm'
                  placeholder='Select Natural Form'
                  options={naturalForms}
                  noResultsText="No Natural Form found"
                />
              </div>
              <div className="row">
                <div className="section-head-header contenth2"><h2>Natural Color</h2></div>
              </div>
              <div className="row">
                <TextField name="naturalColor.level" textPrefix="Level" />
              </div>
              <div className="row">
                <TextField name="naturalColor.tone" textPrefix="Tone" />
              </div>
              <div className="row">
                <div className="section-head-header contenth2"><h2>Amount Of Grey</h2></div>
              </div>
              <div className="row">
                <TextField name="amountOfGrey.front" textPrefix="Front" textSuffix="%" />
              </div>
              <div className="row">
                <TextField name="amountOfGrey.back" textPrefix="Back" textSuffix="%"/>
              </div>
              <div className="row">
                <div className="section-head-header contenth2"><h2>Existing Hair Treatment</h2></div>
              </div>
              <div className="row">
                <ReactSelectField
                  name='existingHairTreatment'
                  placeholder='Select Existing Hair Treatment'
                  options={existingHairTreatments}
                  noResultsText="No Existing Hair Treatment found"
                />
              </div>
              <div className="row">
                <div className="section-head-header contenth2"><h2>Date Of Skin Test</h2></div>
              </div>
              <div className="row">
                    <DateTimePickerField
                        name='dateOfSkinTest.date'
                        placeholder='Date'
                        timeFormat={false}
                      />
              </div>
              <div className="row">
                <TextField name="dateOfSkinTest.result" textPrefix="Results" />
              </div>
              <div className="row">
                  <SubmitField className="submit button">Create Client Service</SubmitField>
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
