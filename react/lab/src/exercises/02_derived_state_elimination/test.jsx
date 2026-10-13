// test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { CartSummary } = await import(target);

describe('REACT-02: Derived State', () => {
  it('computes subtotal and total accurately without prop-sync lag', () => {
    const items = [
      { id: 1, price: 50, quantity: 2 }, // 100
      { id: 2, price: 20, quantity: 1 }  // 20
    ];

    const { rerender } = render(<CartSummary items={items} taxRate={0.1} />);
    expect(screen.getByTestId('subtotal').textContent).toBe('120.00');
    expect(screen.getByTestId('total').textContent).toBe('132.00');

    // Rerender with updated items
    rerender(<CartSummary items={[...items, { id: 3, price: 10, quantity: 1 }]} taxRate={0.1} />);
    expect(screen.getByTestId('subtotal').textContent).toBe('130.00');
    expect(screen.getByTestId('total').textContent).toBe('143.00');
  });
});
