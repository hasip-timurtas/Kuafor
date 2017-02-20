import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const ClientServices = new Mongo.Collection('clientServices')

ClientServices.Schema = new SimpleSchema({
  title: {
    type: String,
    index: 1,
    optional: true,
    max: 256
  },
  content: {
    type: String,
    index: 1,
    optional: true,
    max: 256
  },
  ownerId: {
    type: String,
    index: 1,
    regEx: SimpleSchema.RegEx.Id,
    autoValue () {
    if (this.isInsert) {
      return this.userId
    } else {
      this.unset()
    }
  },
  denyUpdate: true
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
