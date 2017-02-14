import React from 'react';
import {connectField} from 'uniforms';

const Hidden = ({
    disabled,
    name,
    onChange,
    value,
    inputRef,
    ...props
}) =>
    <input
      ref={inputRef}
      name={name}
      disabled={disabled}
      onChange={event => onChange(event.target.value)}
      type="hidden"
      value={value}
    />
;

export default connectField(Hidden);
