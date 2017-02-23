import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { ClientServices } from '/imports/api/clientServices/model'

export const clientServiceSchema = new SimpleSchema({
  customerId: {
    type: String,
    index: 1,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  name: {
    type: String,
    max: 256
  },
  texture: {
    type: String,
    max: 256,
    optional: true
  },
  condition: {
    type: String,
    max: 256,
    optional: true
  },
  naturalForm: {
    type: String,
    max: 256,
    optional: true
  },
  existingHairTreatment: {
    type: String,
    max: 256,
    optional: true
  },
  naturalColor: {
    type: Object,
    optional: true
  },
  'naturalColor.level': {
    type: String,
    max: 256,
    optional: true
  },
  'naturalColor.tone': {
    type: String,
    max: 256,
    optional: true
  },
  amountOfGrey: {
    type: Object,
    optional: true
  },
  'amountOfGrey.front': {
    type: String,
    max: 256,
    optional: true
  },
  'amountOfGrey.back': {
    type: String,
    max: 256,
    optional: true
  },
  dateOfSkinTest: {
    type: Object,
    optional: true
  },
  'dateOfSkinTest.date': {
    type: Date,
    max: 256,
    optional: true
  },
  'dateOfSkinTest.result': {
    type: String,
    max: 256,
    optional: true
  }
})


export const CreateNewClientService = new ValidatedMethod({

  name: 'clientServices.CreateNewClientService',

  validate: clientServiceSchema.validator({ clean: true }),

  run ({ ...clientService }) {
    return ClientServices.insert({
      ...clientService
    })
  }
})
