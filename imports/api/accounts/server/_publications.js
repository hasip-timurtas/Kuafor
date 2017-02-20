import { Meteor } from 'meteor/meteor';

const SinglePersonId = new SimpleSchema({
  personId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
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
