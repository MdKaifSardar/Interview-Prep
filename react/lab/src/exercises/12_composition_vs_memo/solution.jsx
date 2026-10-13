// solution.jsx
import React, { useState } from 'react';

export function CollapsibleBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button data-testid="toggle-collapse" onClick={() => setIsOpen((prev) => !prev)}>
        Toggle
      </button>
      {isOpen && <div data-testid="content">{children}</div>}
    </div>
  );
}
