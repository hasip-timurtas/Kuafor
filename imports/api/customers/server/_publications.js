import { Meteor } from 'meteor/meteor'
import { Customers } from '../model'

Meteor.publish('global.customers', function () {
  this.unblock()
  const { userId } = this
  return Customers.find({ ownerId: userId })
})
