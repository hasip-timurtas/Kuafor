import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { TIME_ZONE, DIAL_CODE, COUNTRY } from '/imports/environment/enums';
import { findBusinessIdFromCurrentConnection } from '/imports/api/businesses/methods';
import { People } from '/imports/api/people/model';
import { updateUserBusinessProfiles } from './';
import DataTrack from '/imports/api/dataTrack'

export const updateOwnProfile = {

  name: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.name',

    validate: new SimpleSchema({
      'name.first': {
        type: String,
        max: 256,
      },
      'name.last': {
        type: String,
        max: 256,
      },
    }).validator({ clean: true }),

    run(name) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.notLoggedIn',
          'user must be logged in to update own profile',
        );
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, name);

      return 'OK';
    },

  }),

  organization: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.organization',

    validate: new SimpleSchema({
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
    }).validator({ clean: true, removeEmptyStrings: false }),

    run(organization) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.notLoggedIn',
          'user must be logged in to update own profile',
        );
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, organization);

      return 'OK';
    },

  }),

  avatarUrl: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.avatarUrl',

    validate: new SimpleSchema({
      avatarUrl: {
        type: String,
      },
    }).validator({ clean: true }),

    run(avatarUrl) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.notLoggedIn',
          'user must be logged in to update own profile',
        );
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, avatarUrl);

      return 'OK';
    },

  }),

  birthDay: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.birthDay',

    validate: new SimpleSchema({
      birthDay: {
        type: Date,
        optional: true,
      },
    }).validator({ clean: true, removeEmptyStrings: false }),

    run(birthDay) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.notLoggedIn',
          'user must be logged in to update own profile',
        );
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, birthDay, null, 'birthDay');

      return 'OK';
    },

  }),

  contactEmails: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.contactEmails',

    validate: new SimpleSchema({
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
      'contactEmails.$': {
        type: Object,
        optional: true,
      },
      'contactEmails.$.address': {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email,
      },
    }).validator(),

    run(contactEmails) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.notLoggedIn',
          'user must be logged in to update own profile',
        );
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      const personWithSameEmailExistsInThisBusiness = _.isArray(contactEmails.contactEmails)
        && contactEmails.contactEmails.length > 0
        && _.some(_.pluck(contactEmails.contactEmails, 'address'), (email) => {
          return email && email.length > 0 && !!People.findOne({
            _id: { $ne: personId },
            businessId,
            'contactEmails.address': email,
          });
        });

      if (personWithSameEmailExistsInThisBusiness) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.emailExists',
          'a person with this email address already exists'
        );
      }

      updateUserBusinessProfiles(personId, contactEmails);

      return 'OK';
    },

  }),

  accountEmail: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.accountEmail',

    validate: new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
      },
    }).validator({ clean: true }),

    run({ email }) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
      }

      const userWithSameEmailExists = !!Meteor.users.findOne({
        'emails.address': email,
      });

      if (userWithSameEmailExists) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.accountEmail.emailExists',
          'a user with this email address already exists'
        );
      }

      Meteor.users.update({
        _id: userId,
        'emails.address': { $ne: email },
      }, {
        $set: {
          emails: [{
            address: email,
            verified: false,
          }],
        },
      }, (e, r) => {
        if (r) {
          if (Meteor.isServer) {
            try {
              Accounts.sendVerificationEmail(userId);
            } catch (e) {
              console.log(e);
            }
          }
        }
      });

      return 'OK';
    },

  }),

  personalizations: new ValidatedMethod({
    name: 'meteor.users.updateOwnProfile.personalizations',

    validate: new SimpleSchema({
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
        max: 256,
      },
      'timeZone.dateFormat': {
        type: String,
        max: 256,
      },
      'timeZone.timeFormat': {
        type: String,
        max: 256,
      },
    }).validator({ clean: true }),

    run(personalizations) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error(
          'meteor.users.updateOwnProfile.notLoggedIn',
          'user must be logged in to update own profile',
        );
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, personalizations);

      DataTrack.track('personalized_profile');

      return 'OK';
    },

  }),

  // TODO: This is very crude and temporary. Convert this to a standalone preferences method later when needed
  preferencesProjectsProjectView: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.preferencesProjectsProjectView',

    validate: null,

    run() {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, null, null, 'preferencesProjectsProjectView');

      return 'OK';
    },

  }),

  preferencesTaskCategoryView: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.preferencesTaskCategoryView',

    validate: new SimpleSchema({
      title: {
        type: String
      },
      opened: {
        type: Boolean
      },
    }).validator({ clean: true }),

    run({ title, opened }) {
      this.unblock();
      if (title !== ('Overdue') && title !== ('No category')) {
        const { userId } = this;

        if (!userId) {
          throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
        }

        const businessId = findBusinessIdFromCurrentConnection.call();
        const person = People.findOne({ userId, businessId });
        let doc = person.preferences.taskCategoryView
        doc[title.replace(/\s+/g, '_')] = opened

        People.update(person._id, {$set: {'preferences.taskCategoryView': doc}})

      }

      return 'OK';
    }

  }),

  preferencesChatCategoryView: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.preferencesChatCategoryView',

    validate: new SimpleSchema({
      chatType: {
        type: String
      },
      opened: {
        type: Boolean
      },
    }).validator({ clean: true }),

    run({ chatType, opened }) {
      this.unblock();

        const { userId } = this;

        if (!userId) {
          throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
        }

        const businessId = findBusinessIdFromCurrentConnection.call();
        const person = People.findOne({ userId, businessId });
        let doc = person.preferences.chatCategoryView
        doc[chatType.replace(/\s+/g, '_')] = opened

        People.update(person._id, {$set: {'preferences.chatCategoryView': doc}})

      return 'OK';
    }

  }),

  // TODO: This is very crude and temporary. Convert this to a standalone preferences method later when needed
  preferencesNotifications: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.preferencesNotifications',

    validate: new SimpleSchema({
      sound: {
        type: Boolean,
        defaultValue: true,
      },
      'chat.instant.newDM': {
        type: Boolean,
        defaultValue: true,
      },
      'project.instant.statusChanged': {
        type: Boolean,
        defaultValue: true,
      },
      'task.instant.newComment': {
        type: Boolean,
        defaultValue: true,
      },
      'task.instant.assignedToMe': {
        type: Boolean,
        defaultValue: true,
      },
      'task.instant.delegatedCompleted': {
        type: Boolean,
        defaultValue: true,
      },
      'task.digest.overdue': {
        type: Boolean,
        defaultValue: true,
      },
      'task.digest.upcomingToday': {
        type: Boolean,
        defaultValue: true,
      },
    }).validator({ clean: true }),

    run(notificationPreferences) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, notificationPreferences, null, 'preferencesNotifications');

      return 'OK';
    },

  }),

  phones: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.phones',

    validate: new SimpleSchema({
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
    }).validator({ clean: true, removeEmptyStrings: false }),

    run(phones) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, phones);

      return 'OK';
    },

  }),

  address: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.address',

    validate: new SimpleSchema({
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
    }).validator({ clean: true, removeEmptyStrings: false }),

    run(address) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, address);

      return 'OK';
    },

  }),

  siteLinks: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.siteLinks',

    validate: new SimpleSchema({
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
    }).validator({ clean: true, removeEmptyStrings: false }),

    run(siteLinks) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, siteLinks);

      return 'OK';
    },

  }),

  socialLinks: new ValidatedMethod({

    name: 'meteor.users.updateOwnProfile.socialLinks',

    validate: new SimpleSchema({
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
    }).validator({ clean: true, removeEmptyStrings: false }),

    run(socialLinks) {
      this.unblock();
      const { userId } = this;

      if (!userId) {
        throw new Meteor.Error('meteor.users.updateOwnProfile.notLoggedIn', 'user must be logged in to update own profile');
      }

      const businessId = findBusinessIdFromCurrentConnection.call();
      const personId = People.findOne({ userId, businessId })._id;

      updateUserBusinessProfiles(personId, socialLinks);

      return 'OK';
    },

  }),

};
