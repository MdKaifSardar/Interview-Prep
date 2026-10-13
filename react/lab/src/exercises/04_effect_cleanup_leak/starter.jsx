// starter.jsx
import React, { useState, useEffect } from 'react';

export function WindowWidthTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // TODO: Add 'resize' listener and RETURN cleanup function
  }, []);

  return <div>Width: <span data-testid="width">{width}</span></div>;
}
