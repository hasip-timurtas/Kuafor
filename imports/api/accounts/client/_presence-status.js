import { Meteor } from 'meteor/meteor';
import { UserPresence, UserPresenceMonitor } from 'meteor/konecty:user-presence';

Meteor.startup( () => {
  UserPresence.awayTime = 5 * 60 * 1000;
  UserPresence.awayOnWindowBlur = false;
  UserPresence.start();
});

