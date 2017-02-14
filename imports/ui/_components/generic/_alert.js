import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

export class AlertOverride extends Component {
  render () {
    return (
      <div className="fixed-notifications-container">
        <div
          className={classNames('notification', {
            'notification-red': this.props.classNames.indexOf('s-alert-error') > 0,
            'notification-orange': this.props.classNames.indexOf('s-alert-warning') > 0,
            'notification-green': this.props.classNames.indexOf('s-alert-success') > 0
          })}
          id={this.props.id}
          style={this.props.styles}
        >
          <div>
            <p>{this.props.message}</p>
          </div>
          <i className="close icon-cross" onClick={this.props.handleClose}></i>
        </div>
      </div>
    )
  }
}

AlertOverride.propTypes = {
  handleClose: PropTypes.func,
  id: PropTypes.string,
  message: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  classNames: PropTypes.string,
  styles: PropTypes.object
}
