import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Notes } from '/imports/api/notes/model'

export const noteSchema = new SimpleSchema({
  title: {
    type: String,
    max: 256
  },
  content: {
    type: String,
    max: 1024
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  }
})


export const CreateNewNote = new ValidatedMethod({

  name: 'notes.CreateNewNote',

  validate: noteSchema.validator({ clean: true }),

  run ({ title, content, ownerId }) {
    return Notes.insert({
      title,
      content,
      ownerId
    })
  }
})
