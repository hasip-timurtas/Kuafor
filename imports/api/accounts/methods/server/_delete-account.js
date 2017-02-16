import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/people/model';
import { USER_ROLE, ACCOUNT_STATUS } from '/imports/environment/enums';
import { deleteBusiness } from '/imports/api/businesses/methods/server';

export const deleteAccount = ({userId}) => {

  try {

    // Mark user's existing client person instances as inactive
    People.find({
      userId,
      role: USER_ROLE.CLIENT
    }).forEach( person => {
      People.update(person._id, {
        $set: {
          status: ACCOUNT_STATUS.INACTIVE,
        },
        $unset: { unusedInvitationSentAt: '' }
      });
    });

  } catch (error) {

    // Log the error, but don't send it to the client
    // TODO: we may want to implement error notifications to admin, also see if we can throw Meteor.Error() in here!
    console.log(`Error in setting user's client account as inactive during account deletion for user with _id ${userId} : \n${error}\n`)

  }

  try {

    // Mark user's existing contributor person instances as archived
    People.find({
      userId,
      role: USER_ROLE.CONTRIBUTOR
    }).forEach( person => {
      People.update(person._id, {
        $set: {
          status: ACCOUNT_STATUS.ARCHIVED,
        },
        $unset: { unusedInvitationSentAt: '' }
      });
    });

  } catch (error) {

    // Log the error, but don't send it to the client
    // TODO: we may want to implement error notifications to admin, also see if we can throw Meteor.Error() in here!
    console.log(`Error in setting user's contributor account as inactive during account deletion for user with _id ${userId} : \n${error}\n`)

  }


  try {

    // Delete user's owned businesses
    People.find({
      userId,
      role: USER_ROLE.OWNER
    }).forEach( person => {
      const { businessId } = person;
      deleteBusiness({userId, businessId});
    });

  } catch (error) {

    // Log the error, but don't send it to the client
    // TODO: we may want to implement error notifications to admin, also see if we can throw Meteor.Error() in here!
    console.log(`Error in deleting user's owned businesses during account deletion for user with _id ${userId} : \n${error}\n`)

  }

  try {

    // Delete user's master profile
    Meteor.users.masterProfile.remove({userId});

  } catch (error) {

    // Log the error, but don't send it to the client
    // TODO: we may want to implement error notifications to admin, also see if we can throw Meteor.Error() in here!
    console.log(`Error in deleting user's master profile during account deletion for user with _id ${userId} : \n${error}\n`)

  }

  try {

    // Delete user's account
    Meteor.users.remove(userId);
    return 'OK';

  } catch (error) {

    // Log the error, but don't send it to the client
    // TODO: we may want to implement error notifications to admin, also see if we can throw Meteor.Error() in here!
    console.log(`Error in deleting user's master profile during account deletion for user with _id ${userId} : \n${error}\n`)

  }

  throw new Meteor.Error('meteor.users.deleteAccount.couldNotDelete', 'Account could not be deleted');

};
