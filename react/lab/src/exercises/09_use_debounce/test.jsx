// test.jsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { useDebounce } = await import(target);

describe('REACT-09: useDebounce', () => {
  it('updates only after specified delay elapses', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    // Rapid changes
    rerender({ val: 'change 1', delay: 300 });
    act(() => vi.advanceTimersByTime(150));
    expect(result.current).toBe('initial'); // Not updated yet

    rerender({ val: 'change 2', delay: 300 });
    act(() => vi.advanceTimersByTime(150));
    expect(result.current).toBe('initial'); // Still timer reset

    // Complete delay
    act(() => vi.advanceTimersByTime(160));
    expect(result.current).toBe('change 2');

    vi.useRealTimers();
  });
});
