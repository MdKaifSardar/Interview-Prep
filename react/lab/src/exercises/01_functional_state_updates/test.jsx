// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { BatchCounter } = await import(target);

describe('REACT-01: Functional State Updates', () => {
  it('increments count by 3 when three queued updates run', () => {
    render(<BatchCounter />);
    const countEl = screen.getByTestId('count');
    const button = screen.getByTestId('add-three');

    expect(countEl.textContent).toBe('0');
    fireEvent.click(button);
    expect(countEl.textContent).toBe('3');
  });
});
