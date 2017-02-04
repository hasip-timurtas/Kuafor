import { Meteor } from 'meteor/meteor'
Notes = new Meteor.Collection('notes')
Meteor.startup(() => {
    // code to run on server at startup
})

Meteor.methods({
  newNote (title, content) {
    if (!Meteor.userId()) {
      throw new Meteor.error('unauthorized', 'unauthorized')
    }

    console.log(Meteor.user())
    const data = {
      title,
      content,
      owner_id: Meteor.userId(),
    //  owner: Meteor.user().services.google.email,
      entry_date: new Date()
    }

    const noteId = Notes.insert(data)
    return noteId
  },

  deleteNote (noteId) {
    Notes.remove(noteId)
  },

  updateNote (updateNote) {
    Notes.update(updateNote.noteId, {
      $set: { title: updateNote.title, content: updateNote.content }
    })
  },

  shareNote (title, content, sharedTo) {
    if (!Meteor.userId()) {
      throw new Meteor.error('unauthorized', 'unauthorized')
    }


    const sharedToUser = ShareMails.findOne({ mail: sharedTo })
    const data = {
      title,
      content,
      owner_id: sharedToUser.userId,
      owner: sharedTo,
      entry_date: new Date(),
      shared: true
    }

    const noteId = Notes.insert(data)
  }
})
