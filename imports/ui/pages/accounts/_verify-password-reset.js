import { Accounts } from 'meteor/accounts-base';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { AutoForm } from 'uniforms-unstyled';
import { TextField, SubmitField } from '/imports/ui/_components/uniforms';
import Alert from 'react-s-alert';


import { AlreadyLoggedIn, TokenNotFound } from '/imports/ui/_layouts';

export class VerifyPasswordReset extends Component {

  static propTypes = {
    params: React.PropTypes.object,
    user: PropTypes.object,
    children: PropTypes.any,
  }

  verifyPasswordResetSchema = new SimpleSchema({
    newPassword: {
      type: String,
      min: 6,
    },
    repeatNewPassword: {
      type: String,
      min: 6,
      custom: function() {
        const newPassword = this.field('newPassword');
        if (this.isSet && newPassword.isSet && this.value !== newPassword.value) {
          return 'passwordMatchError';
        }
      }
    },
  })

  handleVerifyPasswordReset(doc) {
    const {params: {token}} = this.props;
    this.verifyPasswordResetSchema.clean(doc);

    Accounts.resetPassword(token, doc.newPassword, (error) => {
      if (error) {
        Alert.error(error.reason || error.message || error.details);
      } else {
        browserHistory.push('/');
        Alert.success('Password reset!');
      }
    });

  }

  render() {
    const { user, params: {token} } = this.props;

    return !!user
      ? <AlreadyLoggedIn/>
      : !token
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
                  <AutoForm className="form"
                            schema={ this.verifyPasswordResetSchema }
                            onSubmit={ doc => this.handleVerifyPasswordReset(doc) }>
                    <div className="form-header">
                      <h1>Reset your password</h1>
                    </div>
                    <TextField type="password" name="newPassword" placeholder="New password" />
                    <TextField type="password" name="repeatNewPassword" placeholder="Repeat new password" />
                    <SubmitField className="submit button">Reset Password &amp; Login</SubmitField>
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
)(VerifyPasswordReset);
