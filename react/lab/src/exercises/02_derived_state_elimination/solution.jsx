// solution.jsx
import React from 'react';

export function CartSummary({ items = [], taxRate = 0.1 }) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + subtotal * taxRate;

  return (
    <div>
      <span data-testid="subtotal">{subtotal.toFixed(2)}</span>
      <span data-testid="total">{total.toFixed(2)}</span>
    </div>
  );
}
