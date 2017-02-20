import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { hashedPassword } from '/imports/utils/string';

export const signUpAndCreateUserSchema = new SimpleSchema({
  'password': {
    type: String,
    max: 256,
  },
  name: {
    type: Object,
  },
  'name.first': {
    type: String,
    max: 256,
  },
  'name.last': {
    type: String,
    max: 256,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  }
});

export const signUpAndCreateUser = new ValidatedMethod({

  name: 'meteor.users.signUpAndCreateUser',

  validate: signUpAndCreateUserSchema.validator({clean: true}),

  run({password, ...user}) {
    this.unblock();

    if (this.userId) {
      throw new Meteor.Error('meteor.users.signUpAndCreateUser.alreadyLoggedIn', 'You already have a user and you are logged in.')
    }

    if (Meteor.isServer) {
      import { signUpAndCreateUser } from './server';
      return signUpAndCreateUser({...user, password: hashedPassword(password)}); // returns 'OK'
    }

    return 'OK';

  }

});
