// test.jsx
import React, { useRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { CustomInput } = await import(target);

describe('REACT-20: useImperativeHandle', () => {
  it('exposes custom imperative methods to parent ref', () => {
    let inputApi = null;

    function TestParent() {
      const ref = useRef();
      inputApi = ref;
      return <CustomInput ref={ref} />;
    }

    render(<TestParent />);

    const input = screen.getByTestId('internal-input');
    fireEvent.change(input, { target: { value: 'Secret Key' } });

    expect(inputApi.current.getValue()).toBe('Secret Key');

    act(() => {
      inputApi.current.reset();
    });

    expect(inputApi.current.getValue()).toBe('');
  });
});
