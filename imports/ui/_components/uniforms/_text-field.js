import React from 'react'
import { connectField } from 'uniforms'
import classNames from 'classnames'

const Text = ({
    type = 'text',
    textSuffix,
    textPrefix,
    iconClasses,
    iconInner,
    inputClassName,
    disabled,
    name,
    onBlur,
    onChange,
    onKeyDown,
    placeholder,
    value,
    customError,
    errorMessage,
    className,
    inputRef,
    autoFocus,
    children,
    onInputChange,
    ...props
}) =>
   (
    <div className={classNames('fieldset', className, {
      'has-validation-error': errorMessage,
      disabled
    })}>
      <div className={classNames({
        'fieldset-content': true,
        'has-element-right': textSuffix && !textPrefix,
        'has-element-left': textPrefix && !textSuffix,
        'has-element-left-right': textPrefix && textSuffix
      })}>
        {textPrefix ? <span className="inline-extension">{textPrefix}</span> : null}
        <input
          ref={inputRef}
          className={classNames(inputClassName, {
            'has-inner-icon': iconInner
          })}
          name={name}
          onKeyDown={onKeyDown}
          onChange={event => {
            if (onInputChange) {
              onInputChange(event.target.value)
            }
            onChange(event.target.value)
          }}
          placeholder={placeholder}
          type={type}
          value={value}
          onBlur={ (event) => {
            if (onBlur) {
              onBlur()
            }
          }}
          autoFocus={autoFocus}
        />
        {iconInner ? <i className={classNames(iconClasses, { 'inner-icon': iconInner })}></i> : null}
        {textSuffix ? <span className="inline-extension">{textSuffix}</span> : null}
        {iconClasses && !iconInner ? <span><i className={iconClasses}></i></span> : null}
        {children}
      </div>
      {errorMessage ? (
        <p className="validation-message">
          {customError || errorMessage}
        </p>
      ) : null }
    </div>
  )


export default connectField(Text)
