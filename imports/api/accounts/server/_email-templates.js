import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SETTING_PRIVATE } from '/imports/environment/enums';
import { buildSystemEmail } from '/imports/utils/email';

const { FROM_NAME, FROM_EMAIL, SUPPORT_EMAIL } = SETTING_PRIVATE;

Accounts.emailTemplates.siteName = FROM_NAME;
Accounts.emailTemplates.from = `${FROM_NAME}<${FROM_EMAIL}>`;

Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return `Reset your password`;
  },
  html(user, url) {
    return buildSystemEmail({
      firstName: Meteor.users.masterProfile.findOne({userId: user._id}).name.first,
      appUrl: Meteor.absoluteUrl(),
      messageTextLines: [
        `You have requested to reset your account's (${user.emails[0].address}) password.`,
        'To reset your password, please click on the link below.'
      ],
      actionUrl: url.replace('#/reset-password', 'verify-password-reset'),
      actionText: 'Reset password',
      supportEmail: SUPPORT_EMAIL,
    });
  },
};

Accounts.emailTemplates.verifyEmail = {
  subject(user) {
    return `Verify your email address`;
  },
  html(user, url) {
    return buildSystemEmail({
      firstName: Meteor.users.masterProfile.findOne({userId: user._id}).name.first,
      appUrl: Meteor.absoluteUrl(),
      messageTextLines: [
        'Click on the link below to verify your new kuafor account.'
      ],
      actionUrl: url.replace('#/verify-email', 'verify-email-address'),
      actionText: 'Verify account',
      supportEmail: SUPPORT_EMAIL,
    });
  },
};
