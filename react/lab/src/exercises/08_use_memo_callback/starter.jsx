// starter.jsx
import React, { useState, useMemo, useCallback } from 'react';

export const MemoChild = React.memo(({ onAction, renderTracker }) => {
  renderTracker();
  return <button data-testid="child-btn" onClick={onAction}>Child Action</button>;
});

export function ParentCounter({ renderTracker }) {
  const [count, setCount] = useState(10);
  const [text, setText] = useState('');

  // TODO: Wrap expensive calculation in useMemo
  const primeCount = count * 2;

  // TODO: Wrap onAction in useCallback
  const handleAction = () => {
    setCount((c) => c + 1);
  };

  return (
    <div>
      <span data-testid="primes">{primeCount}</span>
      <input
        data-testid="unrelated-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <MemoChild onAction={handleAction} renderTracker={renderTracker} />
    </div>
  );
}
