import { Meteor } from 'meteor/meteor';
import { UserPresence, UserPresenceMonitor } from 'meteor/konecty:user-presence';

Meteor.startup(() => {
  UserPresenceMonitor.start();
  UserPresence.start();
});

