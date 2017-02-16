import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/people/model';
import { Businesses } from '/imports/api/businesses/model';
import { findBusinessIdFromHostname } from '/imports/api/businesses/methods';
import { USER_ROLE, ACCOUNT_STATUS } from '/imports/environment/enums';
import _ from 'underscore';

const SinglePersonId = new SimpleSchema({
  personId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

Meteor.publish('accounts.invitation', function(personId) {
  this.unblock();
  SinglePersonId.validate({personId});
  const person = People.findOne(personId);
  if (person) {
    return [
      People.find(personId),
      Businesses.find(person.businessId),
    ];
  } else {
    this.ready();
  }
});

Meteor.publish('global.accounts.currentUser', function () {
  this.unblock();
  const {userId} = this;
  if (userId) {
    return Meteor.users.find(
      userId,
      {
        fields: {
          _id: 1,
          createdAt: 1,
          statusConnection: 1,
        },
      }
    );
  } else {
    this.ready();
  }
});

Meteor.publish('global.accounts.currentUserMasterProfile', function () {
  this.unblock();
  const {userId} = this;
  if (userId) {
    return Meteor.users.masterProfile.find({userId});
  } else {
    this.ready();
  }
});

Meteor.publishComposite('global.accounts.currentUserBusinessProfilesAndBusinesses', function () {
  return [
    {
      find: function() {
        this.unblock();
        // Current user's pending or active business profiles
        const {userId} = this;
        if (userId) {
          return People.find({
            userId,
            status: {$in: [ACCOUNT_STATUS.PENDING, ACCOUNT_STATUS.ACTIVE]},
          });
        } else {
          return;
        }
      },
      children: [
        {
          find: function ({businessId}) {
            this.unblock();
            // Current user's businesses
            return Businesses.find(businessId);
          },
        },
        {
          find: function({userId,businessId}) {
            this.unblock();
            // Last auth for each business of current user
            return Meteor.users.authenticationLog.find({
              userId,
              businessId,
            }, {sort: {createdAt: -1}, limit:1})
          }
        }
      ]
    },
  ]
});

Meteor.publishComposite('global.accounts.usersInCurrentBusiness', function() {
  return {
    find: function() {
      this.unblock();
      // Business profiles in current business
      const {userId, connection: { httpHeaders: { host } }} = this;
      const hostname = host && host.split(':')[0];
      const businessId = findBusinessIdFromHostname(hostname);

      const currentUserBusinessProfile = People.findOne({
        businessId,
        userId,
        status: {$in: [ACCOUNT_STATUS.PENDING, ACCOUNT_STATUS.ACTIVE]},
      });
      const currentUserBusinessRole = currentUserBusinessProfile && currentUserBusinessProfile.role;

      if ( _.contains([USER_ROLE.OWNER, USER_ROLE.CONTRIBUTOR], currentUserBusinessRole) ) {
        // owner can see everyone
        return People.find({
          businessId,
          //status: {$ne: ACCOUNT_STATUS.DELETED}, // because we still need deleted users in project/task/chat
        })

      } else if (currentUserBusinessRole === USER_ROLE.CLIENT) {

        // TODO: enhance this in such a way that we get the contributors that are in contact
        // with the current user through project or chat
        return People.find({
          $and: [
            { businessId },
            //{ status: {$ne: ACCOUNT_STATUS.DELETED} }, // because we still need deleted users in project/task/chat
            {
              $or: [
                { role: {$in: [USER_ROLE.OWNER, USER_ROLE.CONTRIBUTOR]} },
                { userId }
              ]
            }
          ]
        })

      } else {

        return;

      }

    },
    children: [
      {
        find: function({userId}) {
          this.unblock();
          // Master profiles for users for people in current business
          return Meteor.users.masterProfile.find({userId});
        }
      },
      {
        find: function({userId}) {
          this.unblock();
          // Users for people in current business
          return Meteor.users.find(
            {_id: userId},
            {
              fields: {
                _id: 1,
                createdAt: 1,
                statusConnection: 1,
                emails: 1,
              },
            }
          )
        },
      },
      {
        find: function({userId,businessId}) {
          this.unblock();
          // Last auth for each business of a user
          return Meteor.users.authenticationLog.find({
            userId,
            businessId,
          }, {sort: {createdAt: -1}, limit:1})
        }
      },
    ]
  }
});
