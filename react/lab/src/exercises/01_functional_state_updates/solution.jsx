// solution.jsx
import React, { useState } from 'react';

export function BatchCounter() {
  const [count, setCount] = useState(0);

  const handleAddThree = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <div data-testid="count">{count}</div>
      <button data-testid="add-three" onClick={handleAddThree}>Add Three</button>
    </div>
  );
}
