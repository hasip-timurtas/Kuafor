import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { TextField, SubmitField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'

export class Login extends Component {

  static propTypes = {
    currentBusiness: PropTypes.object,
    children: PropTypes.any
  }

  userLoginSchema = new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    password: {
      type: String,
      min: 6
    }
  })

  handleLogin (doc) {
    this.userLoginSchema.clean(doc)
    const { email, password } = doc
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Alert.error(error.reason || error.message || error.details)
      } else {
        browserHistory.push('/')
      }
    })
  }

  render () {
    return (
      <div className="registrationLayout">
        <div id="page" className="no-pageAddons signin-page">
          <div className="fullscreen signin-wrapper">
            <div className="graphic-wrapper">
              <div className="graphic-container">
                <div className="logo">
                    <img alt="" src="/logo.png" />
                </div>
              </div>
            </div>
            <div className="form-wrapper">
              <div className="form-container">
                <AutoForm
                  className="form"
                  schema={ this.userLoginSchema }
                  onSubmit={ doc => this.handleLogin(doc) }>
                  <p>Don't have an account?
                      <Link to="/signup" className="link link-bold">
                        <span>Create one</span>
                      </Link>
                    </p>

                  <TextField type="email" name="email" placeholder="Email" />
                  <TextField type="password" name="password" placeholder="Password" />
                  <SubmitField className="submit button button-primary">Sign in</SubmitField>
                  <p className="password-reset-option">
                    <Link to="/reset-password" className="link">
                      <span>Forgot your password?</span>
                    </Link>
                  </p>
                </AutoForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Login
