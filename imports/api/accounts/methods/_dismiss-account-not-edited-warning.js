import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const dismissAccountNotEditedWarning = new ValidatedMethod({

  name: 'meteor.users.dismissAccountNotEditedWarning',

  validate: null,

  run() {
    this.unblock();
    const userId = this.userId;
    return Meteor.users.masterProfile.update({userId}, { $set: { accountEdited: true } });
  },

});
