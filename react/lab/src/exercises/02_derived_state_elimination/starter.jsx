// starter.jsx
import React, { useState, useEffect } from 'react';

/**
 * Buggy: Unnecessary state mirroring props! Refactor to direct calculation.
 */
export function CartSummary({ items = [], taxRate = 0.1 }) {
  // TODO: Eliminate useState and useEffect for subtotal/total
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sub = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(sub);
    setTotal(sub + sub * taxRate);
  }, [items, taxRate]);

  return (
    <div>
      <span data-testid="subtotal">{subtotal.toFixed(2)}</span>
      <span data-testid="total">{total.toFixed(2)}</span>
    </div>
  );
}
