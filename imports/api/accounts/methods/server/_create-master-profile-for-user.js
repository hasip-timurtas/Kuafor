import { Meteor } from 'meteor/meteor';

export const createMasterProfileForUser = ({
  userId,
  name,
  email
}) => {

  const profileId = Meteor.users.masterProfile.insert({
    userId,
    name,
    contactEmails: [
      {
        address: email
      }
    ]
  });
};
