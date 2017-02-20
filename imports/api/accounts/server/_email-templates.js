import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { buildSystemEmail } from '/imports/utils/email';

Accounts.emailTemplates.siteName = "clientservicerecord";
Accounts.emailTemplates.from = `clientservicerecord<noreply@clientservicerecord.co.uk>`;

Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return `Reset your password`;
  },
  html(user, url) {
    return buildSystemEmail({
      firstName: "noname",
      appUrl: Meteor.absoluteUrl(),
      messageTextLines: [
        `You have requested to reset your account's (${user.emails[0].address}) password.`,
        'To reset your password, please click on the link below.'
      ],
      actionUrl: url.replace('#/reset-password', 'verify-password-reset'),
      actionText: 'Reset password',
    supportEmail:"support@clientservicerecord.co.uk",
    });
  },
};

Accounts.emailTemplates.verifyEmail = {
  subject(user) {
    return `Verify your email address`;
  },
  html(user, url) {
    return buildSystemEmail({
      firstName: "noname",
      appUrl: Meteor.absoluteUrl(),
      messageTextLines: [
        'Click on the link below to verify your new kuafor account.'
      ],
      actionUrl: url.replace('#/verify-email', 'verify-email-address'),
      actionText: 'Verify account',
      supportEmail:"support@clientservicerecord.co.uk",
    });
  },
};
