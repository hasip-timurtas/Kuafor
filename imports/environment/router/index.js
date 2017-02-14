import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'
import Alert from 'react-s-alert'
import {
  Router,
  IndexRedirect,
  IndexRoute,
  Route,
  browserHistory
} from 'react-router'
import { Provider } from 'react-redux'
import { store } from '/imports/environment/ui-state'

import {
  PageNotFound,
  MainLayout
} from '/imports/ui/_layouts'

import {
CreateNote, ListNotes
} from '/imports/ui/pages/notes'

import { AlertOverride } from '/imports/ui/_components/generic'
import { syncHistoryWithStore } from 'react-router-redux'

import LayoutManager from './_layout-manager'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store,)

const clearAlerts = (e, a) => {
  Alert.closeAll()
}

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <div>
        <Router history={ history }>

          <Route path="/" onEnter={clearAlerts} component={LayoutManager}>

            <IndexRedirect to="notes" />

            <Route component={ MainLayout }>
              <Route path="notes" >
                <IndexRoute component={ ListNotes } />
                <Route path="create-note" component={ CreateNote } />
              </Route>
            </Route>

            <Route path="*" component={ PageNotFound } />

          </Route>

        </Router>
        <Alert
          stack={true}
          timeout={4000}
          effect={'slide'}
          position={'bottom-left'}
          html={true}
          contentTemplate={AlertOverride}
        />
      </div>
    </Provider>,
    document.getElementById('react-root')
  )
})