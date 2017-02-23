import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

export const checkEmailAvailability = new ValidatedMethod({

  name: 'meteor.users.checkEmailAvailability',

  validate: new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validator(),

  run({email}) {
    this.unblock()

    if (Meteor.isServer) {
      import { checkEmailAvailability } from './server'
      return checkEmailAvailability(email) ? 'OK' : false
    }

    return 'OK'

  }

});
