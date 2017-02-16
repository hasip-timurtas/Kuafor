import { Accounts } from 'meteor/accounts-base';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'uniforms-unstyled';
import { TextField, SubmitField } from '/imports/ui/_components/uniforms';
import Alert from 'react-s-alert';


import { AlreadyLoggedIn } from '/imports/ui/_layouts';

export class ResetPassword extends Component {

  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.any,
  }

  resetPasswordSchema = new SimpleSchema({
    emailAddress: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  })

  handleResetPassword(doc) {
    this.resetPasswordSchema.clean(doc);
    Accounts.forgotPassword({
      email: doc.emailAddress,
    }, (error) => {
      if (error) {
        Alert.error(error.reason || error.message || error.details);
      } else {
        browserHistory.push('/');
        Alert.success('Check your inbox for a reset link!');
      }
    });
  }

  render() {
    const { user } = this.props;

    return !!user
      ? <AlreadyLoggedIn/>
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
                  <AutoForm className="form"
                            schema={ this.resetPasswordSchema }
                            onSubmit={ doc => this.handleResetPassword(doc) }>
                    <div className="form-header">
                      <h1>Reset your password</h1>
                    </div>
                    <TextField type="email" name="emailAddress" placeholder="Email" />
                    <SubmitField className="submit button">Reset</SubmitField>
                    <p className="password-reset-option">
                      <Link className="link" to="/">
                        <span>Cancel</span>
                      </Link>
                    </p>
                  </AutoForm>
                </div>
              </div>
            </div>
          </div>
        );

  }

}

export default connect(
  ({globalData:{currentUser: {user}}}) => ({
    user,
  })
)(ResetPassword);
