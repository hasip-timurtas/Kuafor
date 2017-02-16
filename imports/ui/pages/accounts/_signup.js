import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { AutoForm } from 'uniforms-unstyled'
import { HiddenField, TextField, SubmitField } from '/imports/ui/_components/uniforms'
import Alert from 'react-s-alert'
import { AlreadyLoggedIn } from '/imports/ui/_layouts'

/*
import { signUpAndCreateUserAndBusinessSchema, signUpAndCreateUserAndBusiness } from '/imports/api/accounts/methods'
import { checkDomainAvailability } from '/imports/api/businesses/methods'*/
import { checkEmailAvailability } from '/imports/api/accounts/methods'

export const userSignupSchema = new SimpleSchema({
  password: {
    type: String,
    max: 256
  },
  name: {
    type: Object
  },
  'name.first': {
    type: String,
    max: 256
  },
  'name.last': {
    type: String,
    max: 256
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
})

export class Signup extends Component {

  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.any
  }

  // userSignupSchema = signUpAndCreateUserAndBusinessSchema

  handleSignup (doc) {
    userSignupSchema.clean(doc)
    const { email, password } = doc
    checkEmailAvailability.call({ email }, (error, result) => {
      if (error) {
        Alert.error(`An unknown error occured, please try again later.`)
        console.log(error);
      } else if (result === 'OK') {
        Meteor.loginWithPassword(email, password, (error) => {
          if (error) {
            Alert.error(`Account is created, but could not sign-in, please sign in later.`)
          }
          browserHistory.push('/')
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
                  <img alt="kuafor logo" src="/logo-symbol-inverted.png" />
                </div>
                <div className="testimonial-section">
                  <div className="testimonial-cover"></div>
                  <div className="testimonial-text">
                    <p><i className="icon-quote-left"></i>kuafor has helped me centralize all my communication, keep up with deadlines and make sure my files are in one place.<i className="icon-quote-right"></i></p>
                    <p className="testimonial-author">Matthew Beasley<span>Freelencer</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-wrapper">
              <div className="form-container">
                <AutoForm className="form" schema={ userSignupSchema }
                  onSubmit={ doc => this.handleSignup(doc) }>
                  <div className="form-header">
                    <h1>Youre so close to a more streamlined and organised workflow. <strong>Get Started FREE!</strong></h1>
                    <p>Already have an account? <a href="/signin" className="link link-bold"><span>Sign-in</span></a></p>
                  </div>
                  <div className="fieldsets">
                    <TextField name="name.first" placeholder="What's your first name?" />
                    <TextField name="name.last" placeholder="...and last name" />
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
