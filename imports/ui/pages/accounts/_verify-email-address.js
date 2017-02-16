import { Accounts } from 'meteor/accounts-base'
import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Alert from 'react-s-alert'


import { TokenNotFound } from '/imports/ui/_layouts'


export default class VerifyEmailAddress extends Component {

  static propTypes = {
    params: React.PropTypes.object,
    children: PropTypes.any
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { params: { token } } = this.props
    const verifyEmail = Meteor.user().emails[0].verified

    if (!verifyEmail) {
      Accounts.verifyEmail(token, (error) => {
        if (error) {
          Alert.error(error.reason || error.message || error.details)
        } else {
          browserHistory.push('/')
          Alert.success('Thank you for verifying your email address.')
        }
      })
    } else {
      browserHistory.push('/')
      Alert.success('Your email address is already verified')
    }
  }


  render () {
    const { params: { token } } = this.props

    return !token
      ? <TokenNotFound/>
      : (
          <div id="page" className="no-pageAddons signin-page">
            <div className="fullscreen signin-wrapper">
              <div className="graphic-wrapper">
                <div className="graphic-container">
                  <div className="logo">
                    <img alt="" src="/logo-symbol-inverted.png" />
                  </div>
                </div>
              </div>
              <div className="form-wrapper">
                <div className="form-container">
                  <div className="form-header">
                    <h1>Email address verification</h1>
                  </div>
                  <p>You need to verify your email address to fully utilize your kuafor account.</p>
                  <p className="password-reset-option">
                    <Link className="link" to="/">
                      <span>Home</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
  }

}
