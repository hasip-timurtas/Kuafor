import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(function(loginAttempt) {
  const {
    type: loginType,
    methodName: loginMethod,
    user,
    connection: {
      id: meteorConnectionId,
      clientAddress: clientIPAddress,
      httpHeaders
    }
  } = loginAttempt;

  Meteor.users.authenticationLog.insert({
    loginType,
    loginMethod,
    meteorConnectionId,
    clientIPAddress,
    httpHeaders: {
      'x-forwarded-for': httpHeaders['x-forwarded-for'],
      'host': httpHeaders['host'],
      'user-agent': {
        raw: httpHeaders['user-agent'],
      },
      'accept-language': {
        raw: httpHeaders['accept-language'],
      },
    },
  }, function(error, _id) {
    if (error) {
      console.log('ERROR LOGGING AUTHENTICATION LOG: ', error)
    }
  });

});
