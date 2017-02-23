import React, { Component } from 'react'
import { connectField } from 'uniforms'
import classNames from 'classnames'
import Datetime from 'react-datetime'
import moment from 'moment-timezone'

// Component based on https://github.com/YouCanBookMe/react-datetime
class DateTimePicker extends Component {

  state = {
    value: this.props.value || ''
  }
  componentWillReceiveProps ({ value }) {
    const newValue = value !== null ? moment(value) : ''
    if (value || value === null) this.setState({ value: newValue })
  }

  dateParse (timestamp, onChange, onBlur) {
    if (timestamp && moment.isMoment(timestamp)) {
      const date = timestamp.format()
      this.setState({
        value: timestamp
      })
      if (onChange && !moment(this.props.value).isSame(this.state.value)) {
        onChange(date)
      }
      if (onBlur) {
        onBlur()
      }
    } else {
      this.setState({
        value: ''
      })
      if (onChange && this.props.value !== this.state.value) {
        onChange('')
      }
      if (onBlur) {
        onBlur()
      }
    }
  }

  render () {
    const {
      value,
      dateFormat,
      timeFormat,
      onChange,
      onBlur,
      placeholder,
      className,
      inputClassName,
      textPrefix,
      id,
      extraInputProps,
      errorMessage,
      customError,
      viewMode,
      fieldsetStripped,
      ...props
    } = this.props

    return (
      <div className={classNames('fieldset', className, {
        'fieldset-stripped': fieldsetStripped,
        'has-validation-error': errorMessage
      })}>
        <div className={classNames({
          'fieldset-content': true,
          'has-element-left': textPrefix
        })}>
          <Datetime
            viewMode={ viewMode }
            id={id}
            className={ inputClassName }
            value={ this.state.value }
            dateFormat={ dateFormat }
            timeFormat={ timeFormat }
            onChange={ event => this.dateParse(event, null, null) }
            onBlur={ event => this.dateParse(event, onChange, onBlur) }
            inputProps={{
              placeholder,
              ...extraInputProps
            }}
            closeOnTab={true}
          />
          {textPrefix ? <span className="fieldset-label-inline">{textPrefix}</span> : null}
        </div>
        {errorMessage ? (
          <p className="validation-message">
            {customError || errorMessage}
          </p>
        ) : null }
      </div>
    )
  }

}


export default connectField(DateTimePicker)
