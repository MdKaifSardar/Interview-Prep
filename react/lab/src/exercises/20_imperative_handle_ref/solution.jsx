// solution.jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    reset: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    getValue: () => {
      return inputRef.current ? inputRef.current.value : '';
    }
  }));

  return <input ref={inputRef} data-testid="internal-input" defaultValue="" />;
});
