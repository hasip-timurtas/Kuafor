import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'
import { Tracker } from 'meteor/tracker'
import '/imports/api/accounts/model'
import { ClientServices } from '/imports/api/clientServices/model'
import { store, setGlobalData } from '/imports/environment/ui-state'
import moment from 'moment-timezone'
import 'moment-round'
import _ from 'underscore'

// Subscribe to all global publications
Meteor.startup(() => {
  const currentTime = new ReactiveVar(new Date())
  Meteor.setInterval(() => {
    currentTime.set(moment().ceil(1, 'minutes').toDate())
  }, 30 * 1000)

  const subscriptionHandles = []
  subscriptionHandles.push(Meteor.subscribe('global.clientServices'))
  subscriptionHandles.push(Meteor.subscribe('global.accounts.currentUserMasterProfile'))

  // TODO:  separate people to another store for optimum performance, also separate tracker autoruns for fine grained invalidation
  Tracker.autorun((computation) => {
    const currentUser = Meteor.user()
    const currentUserId = Meteor.userId()

    if (_.every(subscriptionHandles, handle => handle.ready())) {
      const data = {
        currentUser: {
          user: currentUser,
          masterProfile: Meteor.users.masterProfile.findOne({ userId: currentUserId })
        },
        siteLoading: !!Meteor.loggingIn(),
        clientServices: ClientServices.find({}, { sort: { createdAt: 0 } }).fetch()
      }

      store.dispatch(setGlobalData('SET_GLOBAL_DATA', data))
    }
  })
})
