import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Customers = new Mongo.Collection('customers')

Customers.Schema = new SimpleSchema({
  ownerId: {
    type: String,
    index: 1,
    regEx: SimpleSchema.RegEx.Id,
    autoValue () {
      if (this.isInsert) {
        return this.userId
      }
      this.unset()
    },
    denyUpdate: true
  },
  surname: {
    type: String,
    max: 256,
    optional: true
  },
  forename: {
    type: String,
    max: 256,
    optional: true
  },
  birthdayDay: {
    type: String,
    max: 256,
    optional: true
  },
  birthdayMonth: {
    type: String,
    max: 256,
    optional: true
  },
  street: {
    type: String,
    max: 256,
    optional: true
  },
  town: {
    type: String,
    max: 256,
    optional: true
  },
  country: {
    type: String,
    max: 256,
    optional: true
  },
  postcode: {
    type: String,
    max: 256,
    optional: true
  },
  telephoneHome: {
    type: String,
    max: 256,
    optional: true
  },
  work: {
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

Customers.attachSchema(Customers.Schema)
