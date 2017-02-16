import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { TIME_ZONE, TIME_FORMATS, DATE_FORMATS } from '/imports/environment/enums';
import { WeekDays } from '/imports/environment/enums/_week-days'
import { hashedPassword } from '/imports/utils/string';

export const acceptInvitationSchema = new SimpleSchema({
  personId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  'name.first': {
    type: String,
    max: 256,
  },
  'name.last': {
    type: String,
    max: 256,
  },
  'timeZone.identifier': {
    type: String,
    allowedValues: TIME_ZONE,
  },
  'timeZone.setManually': {
    type: Boolean,
    defaultValue: false,
  },
  'timeZone.weekStartDay': {
    type: String,
    defaultValue: WeekDays[0],
  },
  'timeZone.dateFormat': {
    type: String,
    defaultValue: DATE_FORMATS[0],
  },
  'timeZone.timeFormat': {
    type: String,
    defaultValue: TIME_FORMATS[0],
  },
  'password': {
    type: String,
    min: 6,
    max: 256,
  },
});

export const acceptInvitation = new ValidatedMethod({

  name: 'meteor.users.acceptInvitation',

  validate: acceptInvitationSchema.validator({clean: true}),

  run({password, ...invitation}) {
    this.unblock();

    if (Meteor.isServer) {
      import { acceptInvitation } from './server';
      return acceptInvitation({...invitation, password: hashedPassword(password)}); // returns 'OK'
    }

    return 'OK';

  },

});
