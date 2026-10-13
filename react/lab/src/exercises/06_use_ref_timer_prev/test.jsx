// test.jsx
import React from 'react';
import { render, screen, act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { usePrevious, Stopwatch } = await import(target);

describe('REACT-06: useRef & usePrevious', () => {
  it('usePrevious tracks the immediate preceding state value', () => {
    const { result, rerender } = renderHook(({ val }) => usePrevious(val), {
      initialProps: { val: 10 }
    });

    expect(result.current).toBeUndefined(); // First render has no prior

    rerender({ val: 25 });
    expect(result.current).toBe(10);

    rerender({ val: 50 });
    expect(result.current).toBe(25);
  });

  it('Stopwatch uses timerRef to start and cleanly stop', () => {
    vi.useFakeTimers();
    render(<Stopwatch />);

    const startBtn = screen.getByTestId('start');
    const stopBtn = screen.getByTestId('stop');
    const timeEl = screen.getByTestId('time');

    act(() => startBtn.click());
    act(() => vi.advanceTimersByTime(300));
    expect(timeEl.textContent).toBe('3');

    act(() => stopBtn.click());
    act(() => vi.advanceTimersByTime(200));
    expect(timeEl.textContent).toBe('3'); // Frozen after stop

    vi.useRealTimers();
  });
});
