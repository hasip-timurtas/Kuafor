import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Accounts} from 'meteor/accounts-base';

export const sendVerificationEmail = new ValidatedMethod({

  name: 'meteor.users.sendVerificationEmail',

  validate: null,

  run() {

    if (this.userId && Meteor.isServer) {
      Accounts.sendVerificationEmail(this.userId);
    }

    return 'OK';

  }

});
