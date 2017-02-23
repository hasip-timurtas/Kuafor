import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const ClientServices = new Mongo.Collection('clientServices')

ClientServices.Schema = new SimpleSchema({
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
  exitingHairTreatment: {
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
  'dateOfSkinTest.test': {
    type: String,
    max: 256,
    optional: true
  },
  'dateOfSkinTest.result': {
    type: String,
    max: 256,
    optional: true
  },
  createdAt: {
    type: Date,
    index: -1,
    autoValue () {
      if (this.isInsert) {
        return new Date()
      }
    },
    denyUpdate: true
  }
})

ClientServices.attachSchema(ClientServices.Schema)
