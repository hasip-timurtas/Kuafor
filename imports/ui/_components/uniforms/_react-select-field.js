import React from 'react'
import { connectField } from 'uniforms'
import classNames from 'classnames'
import Select, { Creatable } from 'react-select'
import _ from 'underscore'

const ReactSelect = ({
    autoBlur,
    allowedValues,
    disabled,
    iconClasses,
    iconInner,
    inputClassName,
    fieldsetClasses,
    label,
    name,
    onChange,
    onBlur,
    placeholder,
    transform,
    value,
    errorMessage,
    className,
    options,
    backspaceRemoves,
    clearable,
    noResultsText,
    textPrefix,
    textSuffix,
    inputRef,
    fieldsetStripped,
    wrappingLabel,
    labelKey,
    valueKey,
    onInputKeyDown,
    onNewOptionClick,
    promptTextCreator,
    allowCreate,
    ...props
}) => {
  const selectOptions = options || allowedValues && allowedValues.map((value, index) =>
       ({ value, label: value })
  ) || []
  if (_.isEmpty(value)) {
    value = false
  }
  const SelectComponent = allowCreate ? Creatable : Select
  return (
    <div className={classNames(fieldsetClasses, {
      fieldset: true,
      'fieldset-stripped': fieldsetStripped,
      'has-validation-error': errorMessage
    }, className)}>
      <div className={classNames({
        'fieldset-content': true,
        'has-element-right': textSuffix && !textPrefix,
        'has-element-left': textPrefix && !textSuffix && !wrappingLabel,
        'has-element-left-right': textPrefix && textSuffix && !wrappingLabel
      })}>
        {
          textPrefix && wrappingLabel ? (
            <label className="fieldset-label">
              <span className="fieldset-label-content">{textPrefix}</span>
              <SelectComponent
                ref={inputRef}
                className={classNames(inputClassName, {
                  'has-inner-icon': iconInner
                })}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={event => onChange(event.value)}
                options={selectOptions}
                placeholder={placeholder}
                clearable={clearable}
                clearValueText="Clear selected value"
                resetValue=""
                backspaceRemoves={backspaceRemoves}
                noResultsText={noResultsText}
                searchable={true}
                openOnFocus={true}
                autoBlur={autoBlur === undefined || autoBlur}
                labelKey={labelKey}
                valueKey={valueKey}
                onInputKeyDown={onInputKeyDown}
                onNewOptionClick={onNewOptionClick}
                promptTextCreator={promptTextCreator}
              />
            </label>
          ) : (
          <SelectComponent
            ref={inputRef}
            className={classNames(inputClassName, {
              'has-inner-icon': iconInner
            })}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={event => onChange(event.value)}
            options={selectOptions}
            placeholder={placeholder}
            clearable={clearable}
            clearValueText="Clear selected value"
            resetValue=""
            backspaceRemoves={backspaceRemoves}
            noResultsText={noResultsText}
            searchable={true}
            openOnFocus={true}
            autoBlur={autoBlur === undefined || autoBlur}
            labelKey={labelKey}
            valueKey={valueKey}
            onInputKeyDown={onInputKeyDown}
            onNewOptionClick={onNewOptionClick}
            promptTextCreator={promptTextCreator}
          />
        )}
        {textPrefix && !wrappingLabel ? <span className="fieldset-label-inline">{textPrefix}</span> : null}
        {iconInner ? <i className={classNames(iconClasses, { 'inner-icon': iconInner })}/> : null}
        {textSuffix ? <span className="inline-extension">{textSuffix}</span> : null}
      </div>
    </div>
  )
}


export default connectField(ReactSelect)
