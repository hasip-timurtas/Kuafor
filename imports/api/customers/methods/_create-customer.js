import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Customers } from '/imports/api/customers/model'

export const customerSchema = new SimpleSchema({
  surname: {
    type: String,
    max: 256
  },
  forename: {
    type: String,
    max: 256
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
  }
})

export const CreateNewCustomer = new ValidatedMethod({

  name: 'clientServices.CreateNewCustomer',

  validate: customerSchema.validator({ clean: true }),

  run ({ ...customer }) {
    Customers.insert({
      ...customer
    })
    return 'OK'
  }
})
