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
import { AlertOverride } from '/imports/ui/_components/generic'
import { syncHistoryWithStore } from 'react-router-redux'
import LayoutManager from './_layout-manager'

import {
  Signup,
  ResetPassword,
  VerifyPasswordReset,
  VerifyEmailAddress,
  Login
} from '/imports/ui/pages/accounts'
import { ClientService, CreateClientService, ListClientServices } from '/imports/ui/pages/clientServices'
import { Customer, CreateCustomer, ListCustomers } from '/imports/ui/pages/customers'


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

            <Route path="signup" component={ Signup } />
            <Route path="reset-password" component={ ResetPassword } />
            <Route path="verify-password-reset/:token" component={ VerifyPasswordReset } />
            <Route path="verify-email-address/:token" component={ VerifyEmailAddress } />

            <IndexRedirect to="customers" />
            <Route component={ MainLayout }>

              <Route path="client-services" >
                <IndexRoute component={ ListClientServices } />
                <Route path="create-clientService" component={ CreateClientService } />
                <Route path=":clientServiceId" component={ ClientService } />
              </Route>

              <Route path="customers" >
                <IndexRoute component={ ListCustomers } />
                <Route path="create-customer" component={ CreateCustomer } />
                <Route path=":customerId" component={ Customer } />
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
