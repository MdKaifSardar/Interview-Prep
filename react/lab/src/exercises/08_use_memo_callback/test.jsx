// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { ParentCounter } = await import(target);

describe('REACT-08: useMemo & useCallback', () => {
  it('prevents memoized child re-render when typing in unrelated parent input', () => {
    const renderTracker = vi.fn();
    render(<ParentCounter renderTracker={renderTracker} />);

    expect(renderTracker).toHaveBeenCalledTimes(1);

    const input = screen.getByTestId('unrelated-input');
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: 'ab' } });

    // Child must NOT re-render because handleAction has stable reference
    expect(renderTracker).toHaveBeenCalledTimes(1);
  });
});
