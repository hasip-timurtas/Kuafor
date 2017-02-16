import { browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'
// import cookie from 'cookie-dough'

export const logOut = () => {
  Meteor.logout(() => {
  /*  cookie().set('COOKIE_NAME', '', {
      path: '/',
      expires: new Date(0)
    })*/
    browserHistory.push('/')
  })
}
