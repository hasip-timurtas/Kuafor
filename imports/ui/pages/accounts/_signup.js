import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { signUpAndCreateUserSchema, signUpAndCreateUser } from '/imports/api/accounts/methods'
import { checkEmailAvailability } from '/imports/api/accounts/methods'
import { AlreadyLoggedIn } from '/imports/ui/_layouts'

export class Signup extends Component {

  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.any
  }

  userSignupSchema = signUpAndCreateUserSchema

  handleSignup (doc) {
    this.userSignupSchema.clean(doc)
    const { email, password } = doc

    checkEmailAvailability.call({ email }, (error, result) => {
      if (error) {
        Alert.error(`An unknown error occured, please try again later. checkEmailAvailability`)
      } else if (result === 'OK') {
        signUpAndCreateUser.call(doc, (error, result) => {
          if (error) {
            Alert.error(`An unknown error occured, please try again later. signUpAndCreateUser`)
          } else if (result === 'OK') {
            Meteor.loginWithPassword(email, password, (error) => {
              if (error) {
                Alert.error(`Account is created, but could not sign-in, please sign in later.`)
              }
              browserHistory.push('/')
            })
          }
        })
      } else if (!result) {
        Alert.error(`An account with this email address already exists. Please try to sign-in instead.`)
      }
    })
  }

  render () {
    const { user } = this.props

    return user
    ? <AlreadyLoggedIn/>
    : (
        <div id="page" className="no-pageAddons main-signup-page">
          <div className="fullscreen">
            <div className="graphic-wrapper">
              <div className="graphic-container">
                <div className="logo">
                </div>
              </div>
            </div>
            <div className="form-wrapper">
              <div className="form-container">
                <AutoForm className="form" schema={ this.userSignupSchema }
                  onSubmit={ doc => this.handleSignup(doc) }>
                  <div className="form-header">
                    <h1><strong>Get Started!</strong></h1>
                    <p>Already have an account? <Link to="/signin" className="link link-bold"><span>Sign-in</span></Link></p>
                  </div>
                  <div className="fieldsets">
                    <TextField name="name.first" placeholder="First name" />
                    <TextField name="name.last" placeholder="Last name" />
                  </div>
                  <hr className="hr-hidden"/>
                  <TextField type="email" name="email" placeholder="Your email" />
                  <TextField type="password" name="password" placeholder="Create a new password" />
                  <SubmitField className="submit button button-primary">Get Started</SubmitField>
                </AutoForm>
              </div>
            </div>
          </div>
        </div>
      )
  }

}

export default connect(
  ({ globalData: { currentUser: { user } } }) => ({
    user
  })
)(Signup)
