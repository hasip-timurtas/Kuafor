import { Accounts } from 'meteor/accounts-base'

Accounts.config({
  forbidClientAccountCreation: true,
  sendVerificationEmail: false, // We are sending manually
  loginExpirationInDays: null,
  passwordResetTokenExpirationInDays: 99
})
