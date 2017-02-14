import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'
import { Tracker } from 'meteor/tracker'
import { Notes } from '/imports/api/notes/model'
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
  subscriptionHandles.push(Meteor.subscribe('global.notes'))

  // TODO:  separate people to another store for optimum performance, also separate tracker autoruns for fine grained invalidation
  Tracker.autorun((computation) => {
    const currentUser = Meteor.user()
    const currentUserId = Meteor.userId()

    if (_.every(subscriptionHandles, handle => handle.ready())) {
      Meteor.subscribe('global.tasks.overdueTasksInUsersBusinesses', currentTime.get())

      const data = {
        currentUser: {
          user: currentUser
        },
        siteLoading: !!Meteor.loggingIn(),
        notes: Notes.find({}, { sort: { createdAt: 0 } }).fetch()
      }

      store.dispatch(setGlobalData('SET_GLOBAL_DATA', data))
    }
  })
})
