import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const deleteAccount = new ValidatedMethod({

  name: 'meteor.users.deleteAccount',

  validate: null,

  run() {
    this.unblock();

    if (Meteor.isServer) {

      const { userId } = this;

      import { deleteAccount } from './server';
      return deleteAccount({userId}); // returns 'OK'

    }
    return 'OK';

  },

});
