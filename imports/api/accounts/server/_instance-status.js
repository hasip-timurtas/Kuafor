import { Meteor } from 'meteor/meteor';
import { InstanceStatus } from 'meteor/konecty:multiple-instances-status'

Meteor.startup(() => {
  InstanceStatus.registerInstance('kuaforINSTANCE');
});
