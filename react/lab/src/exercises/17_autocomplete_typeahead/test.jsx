// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { SearchAutocomplete } = await import(target);

describe('REACT-17: Search Autocomplete', () => {
  it('filters items and fires onSelect upon clicking recommendation', () => {
    const items = ['React', 'Redux', 'Node.js', 'Next.js'];
    const onSelect = vi.fn();

    render(<SearchAutocomplete items={items} onSelect={onSelect} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 're' } });

    expect(screen.getByTestId('suggestion-React')).toBeDefined();
    expect(screen.getByTestId('suggestion-Redux')).toBeDefined();
    expect(screen.queryByTestId('suggestion-Node.js')).toBeNull();

    fireEvent.click(screen.getByTestId('suggestion-React'));
    expect(onSelect).toHaveBeenCalledWith('React');
    expect(input.value).toBe('React');
  });
});
