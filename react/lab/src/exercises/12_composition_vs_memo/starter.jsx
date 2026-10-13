// starter.jsx
import React, { useState } from 'react';

export function CollapsibleBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  // TODO: Render toggle button and conditionally show children
  return (
    <div>
      <button data-testid="toggle-collapse" onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && children}
    </div>
  );
}
