import { Meteor } from 'meteor/meteor';
import { createBusinessProfileAsOwner } from '/imports/api/people/methods';

export const createMasterProfileForUserAndBusinessCreation = ({
  userId,
  businessId,
  name,
  email,
  timeZone,
}) => {

  const profileId = Meteor.users.masterProfile.insert({
    userId,
    name,
    timeZone,
    contactEmails: [
      {
        address: email
      }
    ]
  });

  if (profileId) {

    try {

      return createBusinessProfileAsOwner._execute({userId}, {profileId,businessId});

    } catch (error) {

      console.log(`createMasterProfileForUserAndBusinessCreation.insert \n${error}\n`);
      Meteor.users.masterProfile.remove(profileId);
      throw new Meteor.Error('createMasterProfileForUserAndBusinessCreation.insert', 'could not create user business profile and rolled back');

    }

  }

};

