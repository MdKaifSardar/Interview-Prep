// test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { DynamicTodoList } = await import(target);

describe('REACT-11: Key Index Anti-Pattern Fix', () => {
  it('preserves input values corresponding to item IDs after deleting first item', () => {
    const initial = [
      { id: 101, text: 'First task' },
      { id: 102, text: 'Second task' }
    ];

    render(<DynamicTodoList initialTodos={initial} />);

    // Change input value of second item
    const input2 = screen.getByTestId('input-102');
    fireEvent.change(input2, { target: { value: 'Modified second task' } });

    // Remove first item
    fireEvent.click(screen.getByTestId('remove-101'));

    // Remaining item must retain its modified text
    expect(screen.queryByTestId('todo-item-101')).toBeNull();
    const remainingInput = screen.getByTestId('input-102');
    expect(remainingInput.value).toBe('Modified second task');
  });
});
