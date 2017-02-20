import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import cookie from 'cookie-dough';
/* TODO: improve cross domain logins
    1. switch to more popular https://github.com/js-cookie/js-cookie
    2. implement tracker based reactivity on the cookie getter
    3. Switch over the implementation to iframe based postMessage request
       to synchronize the localStorage to and from master domain
 */

Meteor.startup(()=>{
  const { localStorage } = window;
  if (localStorage) {

    // TODO: Implement Accounts.onLogout(cb) instead of the Meteor.logout(cb) in userbar component!
    // TODO: Also, we can use logoutotherclients, too!!! Clean up remaining clients!
    Tracker.autorun(()=> {

      const user = Meteor.user();

      if ( user ) {

        const loginToken = {
          token: localStorage['Meteor.loginToken'],
          expires: new Date(localStorage['Meteor.loginTokenExpires'])
        };

        cookie().set("Kuafor", loginToken.token, {
          path: "/",
          expires: loginToken.expires,
        });

         if(window.WebViewBridge) {
          window.WebViewBridge.send(JSON.stringify({event: 'loggedIn', userId: user._id}));
        }

      } else if (!Meteor.loggingIn()) {

        const existingCookie = cookie().get("kuafor");

        if (!!existingCookie){

          Meteor.loginWithToken(existingCookie, (err) => {

            if (err){

              cookie().set("kuafor", '', {
                path: "/",
                expires: new Date(0),
              });

            }

          });

        }

      }

    })

  }

});
