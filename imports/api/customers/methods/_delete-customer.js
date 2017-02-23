import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Customers } from '/imports/api/customers/model'

export const deleteCustomer = new ValidatedMethod({
  name: 'Customers.deleteCustomer',

  validate: new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),

  run ({ _id }) {
    this.unblock()

    const { userId } = this

    const customer = Customers.findOne({ _id })

    if (!customer) {
      throw new Meteor.Error(
        'projects.deleteCustomer.notAllowed',
        'customer could not found'
      )
    }

    if (Customers.remove(_id)) {
      console.log(`customer ${customer.forename} Removed`)
    }

    return 'OK'
  }
})
