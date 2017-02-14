import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Notes = new Mongo.Collection('notes')

Notes.Schema = new SimpleSchema({
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
    optional: true,
    regEx: SimpleSchema.RegEx.Id
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

Notes.attachSchema(Notes.Schema)
