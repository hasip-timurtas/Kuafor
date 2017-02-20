import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'underscore';

Meteor.users.masterProfile = new Mongo.Collection('usersmasterprofile');

Meteor.users.masterProfile.schema = new SimpleSchema({
  userId: {
    type: String,
    index: 1,
    unique: true,
    regEx: SimpleSchema.RegEx.Id,
  },
  accountEdited: {
    type: Boolean,
    defaultValue: false,
  },
  'name.first': {
    type: String,
    max: 256,
  },
  'name.last': {
    type: String,
    max: 256,
  },
  'organization.name': {
    type: String,
    max: 256,
    optional: true,
  },
  'organization.role': {
    type: String,
    max: 256,
    optional: true,
  },
  avatarUrl: {
    type: String,
    optional: true,
  },
  birthDay: {
    type: Date,
    optional: true,
  },
  contactEmails: {
    type: [Object],
    optional: true,
    custom: function () {
      if (this.isSet) {
        if (this.value.length !== _.uniq(_.pluck(this.value, 'address')).length) {
          return 'notUnique';
        }
      }
    },
  },
  'contactEmails.$.address': {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
  },
  'phones.$.countryDialCode': {
    type: String,
    optional: true,
  },
  'phones.$.number': {
    type: String,
    max: 256,
    optional: true,
  },
  'address.street': {
    type: String,
    max: 256,
    optional: true,
  },
  'address.city': {
    type: String,
    max: 256,
    optional: true,
  },
  'address.zipCode': {
    type: String,
    max: 256,
    optional: true,
  },
  'address.country': {
    type: String,
    optional: true,
  }
});

Meteor.users.masterProfile.attachSchema(Meteor.users.masterProfile.schema);
