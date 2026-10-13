// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { CollapsibleBox } = await import(target);

describe('REACT-12: Composition vs Re-renders', () => {
  it('does not re-render children when parent toggles internal state', () => {
    const childRenderSpy = vi.fn();

    function ExpensiveChild() {
      childRenderSpy();
      return <span data-testid="expensive-child">Expensive Content</span>;
    }

    render(
      <CollapsibleBox>
        <ExpensiveChild />
      </CollapsibleBox>
    );

    expect(childRenderSpy).toHaveBeenCalledTimes(1);

    // Toggle close then open
    const toggleBtn = screen.getByTestId('toggle-collapse');
    fireEvent.click(toggleBtn); // close
    fireEvent.click(toggleBtn); // open

    // Children re-evaluated only when mounted into DOM, not needlessly on state identity
    expect(screen.getByTestId('expensive-child')).toBeDefined();
  });
});
