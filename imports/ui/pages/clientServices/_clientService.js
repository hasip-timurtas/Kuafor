import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField, ReactSelectField, DateTimePickerField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { CreateNewClientService, clientServiceSchema } from '/imports/api/clientServices/methods'
import Portal from 'react-portal'
import { DeleteRecord } from '/imports/ui/_components/generic'

export class ClientService extends Component {

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

  handleRemove () {
    const { user, currentClientService: { _id }, currentClientService } = this.props
    deleteClientService.call({ _id }, (error) => {
      if (error) {
        Alert.error(error.reason || error.message || error.details)
      } else {
        Alert.success('Client Service is successfully deleted.')
      }
    })
  }


  render () {
    const { currentClientService } = this.props

    if (!currentClientService) return <h2> Client service could not find. </h2>

    const { user, currentClientService: {
      name,
      texture,
      condition,
      naturalForm,
      existingHairTreatment,
      naturalColor,
      amountOfGrey,
      dateOfSkinTest }
    } = this.props


    console.log(currentClientService)
    const optionsDeleteRecord = {
      handleDelete: ::this.handleRemove,
      description: 'This client service record will be permanently deleted.',
      strongArea: `Are you sure you want to delete ${name}`
    }

    return (
      <div className='section'>
        <h1> Client Service Record </h1>
        <div className='section-body'>
          <div className='section-body-block content client-service-detail'>
            <div className='blocks-section selectable-text'>
              {texture && (
                <div className='fieldset-stripped'>
                    <span className='supline none-clickable'>Texture</span>
                    {texture}
                </div>
              )}
              {condition && (
                <div className='fieldset-stripped'>
                    <span className='supline none-clickable'>condition</span>
                    {condition}
                </div>
              )}
              {naturalForm && (
                <div className='fieldset-stripped'>
                    <span className='supline none-clickable'>naturalForm</span>
                    {naturalForm}
                </div>
              )}
              {existingHairTreatment && (
                <div className='fieldset-stripped'>
                    <span className='supline none-clickable'>existingHairTreatment</span>
                    {existingHairTreatment}
                </div>
              )}
              {naturalColor && naturalColor.level && naturalColor.tone && (
                <div className='fieldset-stripped'>
                    <p className="font-blue">Natural Color</p>
                    <span className='supline none-clickable'>level</span>
                    {naturalColor.level}
                    <span className='supline none-clickable'>tone</span>
                    {naturalColor.tone}
                </div>
              )}
              {amountOfGrey && amountOfGrey.front && amountOfGrey.back && (
                <div className='fieldset-stripped'>
                    <p className="font-blue">Amount Of Grey</p>
                    <span className='supline none-clickable'>front</span>
                    {amountOfGrey.front} %
                    <span className='supline none-clickable'>back</span>
                    {amountOfGrey.back} %
                </div>
              )}
              {dateOfSkinTest && dateOfSkinTest.date && dateOfSkinTest.result && (
                <div className='fieldset-stripped'>
                    <p className="font-blue">Date Of Skin Test</p>
                    <span className='supline none-clickable'>date</span>
                    {dateOfSkinTest.date}
                    <span className='supline none-clickable'>result</span>
                    {dateOfSkinTest.result}
                </div>
              )}
              <div className='fieldset-stripped'>
                <Portal head='Create new customer' closeOnEsc openByClickOn={<a className='button button-faint button-red'>Delete Record</a>}>
                        <DeleteRecord {...optionsDeleteRecord} />
                </Portal>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
}

export default connect(
  ({ globalData: { customers, clientServices, currentUser: { user } } }, ownProps) => ({
    user,
    currentClientService: clientServices.find(c => c._id === ownProps.params.clientServiceId)
  })
)(ClientService)
