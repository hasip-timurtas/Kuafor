import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { slugify, hashedPassword } from '/imports/utils/string';
import { TIME_ZONE } from '/imports/environment/enums';

export const signUpAndCreateUserAndBusinessSchema = new SimpleSchema({
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
  },
  business: {
    type: Object,
  },
  'business.name': {
    type: String,
    min: 3,
    max: 256,
  },
  'business.domain': {
    type: String,
    min:3,
    max: 256,
    autoValue: function() {
      if (this.isSet) {
        return slugify(this.value);
      }
    }
  },
  timeZone: {
    type: Object,
  },
  'timeZone.identifier': {
    type: String,
    allowedValues: TIME_ZONE,
  },
});

export const signUpAndCreateUserAndBusiness = new ValidatedMethod({

  name: 'meteor.users.signUpAndCreateUserAndBusiness',

  validate: signUpAndCreateUserAndBusinessSchema.validator({clean: true}),

  run({password, ...user}) {
    this.unblock();

    if (this.userId) {
      throw new Meteor.Error('meteor.users.signUpAndCreateUserAndBusiness.alreadyLoggedIn', 'You already have a user and you are logged in.')
    }

    if (Meteor.isServer) {
      import { signUpAndCreateUserAndBusiness } from './server';
      return signUpAndCreateUserAndBusiness({...user, password: hashedPassword(password)}); // returns 'OK'
    }

    return 'OK';

  }

});
