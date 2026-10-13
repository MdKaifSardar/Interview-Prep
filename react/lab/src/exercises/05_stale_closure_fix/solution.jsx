// solution.jsx
import React, { useState, useEffect } from 'react';

export function StaleTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Fix: Functional updater syntax accesses latest state
      setSeconds((prev) => prev + 1);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return <div data-testid="timer">{seconds}</div>;
}
