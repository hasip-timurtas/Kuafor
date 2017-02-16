import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { slugify } from '/imports/utils/string';
import { TIME_ZONE, DIAL_CODE, COUNTRY, PROJECT_TASKS_VIEW, TIME_FORMATS, DATE_FORMATS } from '/imports/environment/enums';
import { WeekDays } from '/imports/environment/enums/_week-days';
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
  'preferences.projects.projectView': {
    type: String,
    allowedValues: _.values(PROJECT_TASKS_VIEW),
    defaultValue: PROJECT_TASKS_VIEW.LIST,
  },
  'preferences.notifications.sound': {
    type: Boolean,
    defaultValue: true,
  },
  'preferences.notifications.chat.instant.newDM': {
    type: Boolean,
    defaultValue: true,
  },
  'preferences.notifications.project.instant.statusChanged': {
    type: Boolean,
    defaultValue: true,
  },
  'preferences.notifications.task.instant.newComment': {
    type: Boolean,
    defaultValue: true,
  },
  'preferences.notifications.task.instant.assignedToMe': {
    type: Boolean,
    defaultValue: true,
  },
  'preferences.notifications.task.instant.delegatedCompleted': {
    type: Boolean,
    defaultValue: true,
  },
  'preferences.notifications.task.digest.overdue': {
    type: Boolean,
    defaultValue: true,
  },
  'preferences.notifications.task.digest.upcomingToday': {
    type: Boolean,
    defaultValue: true,
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
  slug: {
    type: String,
    index: 1,
    unique: true,
    denyUpdate: true,
    autoValue: function () {
      const first = this.field('name.first');
      const last = this.field('name.last');
      if (this.isInsert) {
        if (first.isSet && last.isSet) {
          const userSlug = slugify(`${first.value} ${last.value}`);
          const usersCount = parseInt(Meteor.users.masterProfile.find({ slug: userSlug }).count());
          return `${userSlug}${usersCount > 0 ? '-' + usersCount + 1 : ''}`;
        }
      } else {
        this.unset();
      }
    },
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
  'phones.$.countryDialCode': {
    type: String,
    allowedValues: DIAL_CODE,
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
    allowedValues: _.pluck(COUNTRY, 'name'),
    optional: true,
  },
  'siteLinks.$.name': {
    type: String,
    max: 256,
    optional: true,
  },
  'siteLinks.$.url': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  'socialLinks.facebook': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  'socialLinks.linkedIn': {
    label: 'LinkedIn',
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  'socialLinks.twitter': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  'socialLinks.googlePlus': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  'deviceTokens.ios': {
    type: [String],
    optional: true
  },
  'deviceTokens.android': {
    type: [String],
    optional: true
  },
  'badgeCount.$.docId': {
    type: String,
    optional: true
  },
  'badgeCount.$.count': {
    type: Number,
    optional: true
  }
});

Meteor.users.masterProfile.attachSchema(Meteor.users.masterProfile.schema);
