import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { ClientServices } from '/imports/api/clientServices/model'

export const deleteClientService = new ValidatedMethod({
  name: 'ClientServices.deleteClientService',

  validate: new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),

  run ({ _id }) {
    this.unblock()
    const clientService = ClientServices.findOne({ _id })

    if (!clientService) {
      throw new Meteor.Error(
        'projects.deleteCustomer.notAllowed',
        'customer could not found'
      )
    }

    if (ClientServices.remove(_id)) {
      console.log(`customer ${clientService.name} Removed`)
    }

    return 'OK'
  }
})
