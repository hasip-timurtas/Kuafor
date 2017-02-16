import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { CONNECTION_STATUS } from "/imports/environment/enums/index";
import _ from 'underscore';

Meteor.users.schema = new SimpleSchema({
  createdAt: {
    type: Date,
  },
  'services.resume.loginTokens.$.when': {
    type: Date,
    optional: true,
  },
  'services.resume.loginTokens.$.hashedToken': {
    type: String,
    optional: true,
  },
  'services.password.bcrypt': {
    type: String,
  },
  'services.password.srp': {
    type: Object,
    blackbox: true,
    optional: true,
  },
  'services.password.reset.token': {
    type: String,
    optional: true,
  },
  'services.password.reset.email': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  'services.password.reset.when': {
    type: Date,
    optional: true,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  'services.email.verificationTokens.$.token': {
    type: String,
    optional: true,
  },
  'services.email.verificationTokens.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  'services.email.verificationTokens.$.when': {
    type: Date,
    optional: true,
  },
  status: {
    type: String,
    allowedValues: _.values(CONNECTION_STATUS),
    optional: true,
  },
  statusConnection: {
    type: String,
    allowedValues: _.values(CONNECTION_STATUS),
    index: 1,
    defaultValue: CONNECTION_STATUS.OFFLINE,
  },
});

Meteor.users.attachSchema(Meteor.users.schema);
