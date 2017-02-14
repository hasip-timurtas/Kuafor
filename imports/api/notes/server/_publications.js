import { Meteor } from 'meteor/meteor'
import { Notes } from '../model'

Meteor.publish('global.notes', function () {
  this.unblock()
  return Notes.find()
})
