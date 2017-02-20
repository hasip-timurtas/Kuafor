import { ValidatedMethod } from 'meteor/mdg:validated-method';
//import DataTrack from '/imports/api/dataTrack'

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

    //DataTrack.track('removed_account');

    return 'OK';

  },

});
