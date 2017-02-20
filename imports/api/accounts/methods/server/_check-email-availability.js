import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const checkEmailAvailability = (email) => {
  return !!Accounts.findUserByEmail(email) ? false : 'OK';
};
