// test.jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { StaleTimer } = await import(target);

describe('REACT-05: Stale Closure Fix', () => {
  it('increments past 1 over multiple timer intervals', () => {
    vi.useFakeTimers();
    render(<StaleTimer />);
    const timerEl = screen.getByTestId('timer');

    expect(timerEl.textContent).toBe('0');

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(timerEl.textContent).toBe('1');

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(timerEl.textContent).toBe('3');

    vi.useRealTimers();
  });
});
