import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { findBusinessIdFromHostname } from '/imports/api/businesses/methods';
import { LOGIN_TYPE, LOGIN_METHOD, COUNTRY } from '/imports/environment/enums';
import _ from 'underscore';

Meteor.users.authenticationLog = new Mongo.Collection('usersauthenticationlog');

if (Meteor.isServer) {

  // TODO: Webstorm freaks out about imports when they are nested and not within their own function context
  const { InstanceStatus } = require('meteor/konecty:multiple-instances-status');
  const geoip = require('geoip-ultralight');
  const parseLanguage = require('accept-language-parser');
  const uaParser = require('ua-parser-js');

  Meteor.users.authenticationLog.schema = new SimpleSchema({
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      index: 1,
      autoValue: function() {
        return this.userId;
      }
    },
    businessId: {
      type: String,
      index: 1,
      autoValue: function() {
        const host = this.field('httpHeaders.host');
        if (host.isSet) {
          const hostname = host.value.split(':')[0];
          return findBusinessIdFromHostname(hostname);
        }
      }
    },
    createdAt: {
      type: Date,
      index: -1,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        }
      },
      denyUpdate: true,
    },
    loginType: {
      type: String,
      index: 1,
      allowedValues: _.values(LOGIN_TYPE),
    },
    loginMethod: {
      type: String,
      index: 1,
      allowedValues: _.values(LOGIN_METHOD),
    },
    meteorConnectionId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    clientIPAddress: {
      type: String,
      regEx: SimpleSchema.RegEx.IP,
    },
    clientCountry: {
      type: String,
      index: 1,
      autoValue: function() {
        const clientIPAddress = this.field('clientIPAddress');
        if (clientIPAddress.isSet) {
          const clientCountryCode = geoip.lookupCountry(clientIPAddress.value);
          const clientCountry = _.findWhere(COUNTRY, {code: clientCountryCode});
          return clientCountry ? clientCountry.name : 'UNKNOWN';
        }
      },
    },
    'httpHeaders.x-forwarded-for': {
      type: String,
      optional: true,
    },
    'httpHeaders.host': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.raw': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail': {
      type: Object,
      optional: true,
      autoValue: function() {
        const userAgent = this.siblingField('raw');
        if (userAgent.isSet) {
          const detail = _.omit(uaParser(userAgent.value), 'ua');
          if (_.isObject(detail)) {
            return detail;
          }
        }
      }
    },
    'httpHeaders.user-agent.detail.browser.name': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.browser.version': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.browser.major': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.engine.name': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.engine.version': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.os.name': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.os.version': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.device.model': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.device.type': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.device.vendor': {
      type: String,
      optional: true,
    },
    'httpHeaders.user-agent.detail.cpu.architecture': {
      type: String,
      optional: true,
    },
    'httpHeaders.accept-language.raw': {
      type: String,
      optional: true,
    },
    'httpHeaders.accept-language.languages': {
      type: [Object],
      optional: true,
      autoValue: function() {
        const acceptLang = this.siblingField('raw');
        if (acceptLang.isSet) {
          const languages = parseLanguage.parse(acceptLang.value);
          if (languages.length > 0) {
            return languages;
          }
        }
      }
    },
    'httpHeaders.accept-language.languages.$.script': {
      type: String,
      optional: true,
    },
    'httpHeaders.accept-language.languages.$.code': {
      type: String,
      optional: true,
    },
    'httpHeaders.accept-language.languages.$.region': {
      type: String,
      optional: true,
    },
    'httpHeaders.accept-language.languages.$.quality': {
      type: Number,
      decimal: true,
      optional: true,
    },
    serverInstance: {
      type: Object,
      autoValue: function() {
        const _id = InstanceStatus.id();
        const { pid, name, _createdAt } = InstanceStatus.getCollection().findOne(_id);
        return {
          _id,
          pid,
          name,
          createdAt: _createdAt,
        };
      }
    },
    'serverInstance._id': {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    'serverInstance.pid': {
      type: Number,
    },
    'serverInstance.name': {
      type: String,
    },
    'serverInstance.createdAt': {
      type: Date,
    },
  });

  Meteor.users.authenticationLog.attachSchema(Meteor.users.authenticationLog.schema);

}
