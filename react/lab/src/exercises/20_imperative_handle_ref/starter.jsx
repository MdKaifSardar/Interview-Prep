// starter.jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // TODO: Use useImperativeHandle to expose focus(), reset(), and getValue()
  useImperativeHandle(ref, () => ({
    focus: () => {},
    reset: () => {},
    getValue: () => ''
  }));

  return <input ref={inputRef} data-testid="internal-input" defaultValue="" />;
});
