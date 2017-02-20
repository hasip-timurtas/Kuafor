import { Meteor } from 'meteor/meteor'
import { ClientServices } from '../model'

Meteor.publish('global.clientServices', function () {
  this.unblock()
  return ClientServices.find()
})
