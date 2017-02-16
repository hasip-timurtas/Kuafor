import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const acceptInvitationForExistingUserSchema = new SimpleSchema({
  personId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

export const acceptInvitationForExistingUser = new ValidatedMethod({

  name: 'meteor.users.acceptInvitationForExistingUser',

  validate: acceptInvitationForExistingUserSchema.validator(),

  run({personId}) {
    this.unblock();
    const {userId} = this;
    if (!userId) {
      throw new Meteor.Error('meteor.users.acceptInvitationForExistingUser.notLoggedIn', 'a user must be logged in to accept invitation for existing user');
    }
    
    if (Meteor.isServer) {
      import { acceptInvitationForExistingUser } from './server';
      return acceptInvitationForExistingUser(personId, userId); // returns 'OK'
    }

    return 'OK';

  },

});
