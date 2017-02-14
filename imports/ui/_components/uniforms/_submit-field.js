import React from 'react';
import {BaseField} from 'uniforms';

const Submit = ({children, ...props}, {uniforms: {error, state: {disabled} = {}}}) => (
  <button
    {...props}
    disabled={error || disabled ? true : null}
    type="submit" >
    {children}
  </button>
);

Submit.contextTypes = BaseField.contextTypes;

export default Submit;
