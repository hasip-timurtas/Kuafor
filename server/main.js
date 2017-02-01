import {Meteor} from 'meteor/meteor';
Notes = new Meteor.Collection("notes");
Meteor.startup(() => {
    // code to run on server at startup
});
  
Meteor.methods({
    newNote: function (title, content) {
        if (!Meteor.userId()) {
            throw new Meteor.error("unauthorized", "unauthorized");
        }
        ;

        var data = {
            title: title,
            content: content,
            owner_id: Meteor.userId(),
            owner: Meteor.user().services.google.email,
            entry_date: new Date()
        };

        var noteId = Notes.insert(data);
        return noteId;
    },

    deleteNote: function (noteId) {
        Notes.remove(noteId);
    },

    updateNote: function (updateNote) {
        Notes.update(updateNote.noteId, {
            $set: {title: updateNote.title, content: updateNote.content}
        });
    },

    shareNote: function (title, content, sharedTo) {
        if (!Meteor.userId()) {
            throw new Meteor.error("unauthorized", "unauthorized");
        }
        ;

        var sharedToUser = ShareMails.findOne({mail: sharedTo});
        var data = {
            title: title,
            content: content,
            owner_id: sharedToUser.userId,
            owner: sharedTo,
            entry_date: new Date(),
            shared: true
        };

        var noteId = Notes.insert(data);
    }
});
