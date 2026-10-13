// starter.jsx
import React, { useState } from 'react';

export function BatchCounter() {
  const [count, setCount] = useState(0);

  const handleAddThree = () => {
    // TODO: Increment count by 3 using 3 updates with functional updater syntax
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <div data-testid="count">{count}</div>
      <button data-testid="add-three" onClick={handleAddThree}>Add Three</button>
    </div>
  );
}
