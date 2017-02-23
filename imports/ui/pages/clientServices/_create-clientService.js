import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField, ReactSelectField, DateTimePickerField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { CreateNewClientService, clientServiceSchema } from '/imports/api/clientServices/methods'


export class CreateClientService extends Component {

  static propTypes = {
    user: PropTypes.object
  }

  clientServiceSchemaa = clientServiceSchema

  handleCreateClientService (doc) {
    this.clientServiceSchemaa.clean(doc)

    CreateNewClientService.call(doc, (error, result) => {
      if (error) {
        Alert.error(`Hatay verdi.`)
      } else if (result === 'OK') {
        Alert.error(`ClientService başarıyla kaydedildi`)
      }
    })
  }

  render () {
    const { user } = this.props

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
      <div className="new-clientService-area">
      <a className="back-button" onClick={browserHistory.goBack} ><span> <i className="icon-chevron-left"> </i> Back</span></a>
            <h1> Client Service Record </h1>
            <AutoForm className="new-clientService" schema={ this.clientServiceSchemaa } onSubmit={ doc => this.handleCreateClientService(doc) }>
              <div className="row">
                <div className="col-md-3">
                  <div className="section-head-header contenth2"><h2>Texture</h2></div>
                </div>
                <div className="col-md-3">
                  <ReactSelectField
                    name='texture'
                    placeholder='Select Texture'
                    options={textures}
                    noResultsText="No texture found"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="section-head-header contenth2"><h2>Condition</h2></div>
                </div>
                <div className="col-md-3">
                  <ReactSelectField
                    name='condition'
                    placeholder='Select Condition'
                    options={conditions}
                    noResultsText="No Condition found"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="section-head-header contenth2"><h2>Natural Form</h2></div>
                </div>
                <div className="col-md-3">
                  <ReactSelectField
                    name='naturalForm'
                    placeholder='Select Natural Form'
                    options={naturalForms}
                    noResultsText="No Natural Form found"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="section-head-header contenth2"><h2>Natural Color</h2></div>
                </div>
                <div className="col-md-3">
                  <TextField name="naturalColor.level" textPrefix="Level" />
                </div>
                <div className="col-md-3">
                  <TextField name="naturalColor.tone" textPrefix="Tone" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="section-head-header contenth2"><h2>Amount Of Grey</h2></div>
                </div>
                <div className="col-md-3">
                  <TextField name="amountOfGrey.front" textPrefix="Front" textSuffix="%" />
                </div>
                <div className="col-md-3">
                  <TextField name="amountOfGrey.back" textPrefix="Back" textSuffix="%"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="section-head-header contenth2"><h2>Existing Hair Treatment</h2></div>
                </div>
                <div className="col-md-3">
                  <ReactSelectField
                    name='existingHairTreatment'
                    placeholder='Select Existing Hair Treatment'
                    options={existingHairTreatments}
                    noResultsText="No Existing Hair Treatment found"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="section-head-header contenth2"><h2>Date Of Skin Test</h2></div>
                </div>
                <div className="col-md-3">
                      <DateTimePickerField
                          name='dateOfSkinTest.date'
                          placeholder='Date'
                          timeFormat={false}
                          textPrefix='Date'
                        />
                </div>
                <div className="col-md-6">
                  <TextField name="dateOfSkinTest.result" textPrefix="Results" />
                </div>
              </div>
                <div className="row">
                  <div className="col-md-3">
                    <SubmitField className="submit button">Create Client Service</SubmitField>
                  </div>
                </div>
            </AutoForm>
      </div>
    )
  }
}

export default connect(
  ({ globalData: { clientServices, currentUser: { user } } }) => ({
    clientServices,
    user
  })
)(CreateClientService)
