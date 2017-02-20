import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { ClientServices } from '/imports/api/clientServices/model'

export const clientServiceSchema = new SimpleSchema({
  title: {
    type: String,
    max: 256
  },
  content: {
    type: String,
    max: 1024
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  }
})


export const CreateNewClientService = new ValidatedMethod({

  name: 'clientServices.CreateNewClientService',

  validate: clientServiceSchema.validator({ clean: true }),

  run ({ title, content, ownerId }) {
    return ClientServices.insert({
      title,
      content,
      ownerId
    })
  }
})
