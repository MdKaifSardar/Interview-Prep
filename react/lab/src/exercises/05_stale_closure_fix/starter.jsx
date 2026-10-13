// starter.jsx
import React, { useState, useEffect } from 'react';

/**
 * Buggy: Stale closure causes seconds to stay at 1!
 */
export function StaleTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // BUG: Stale closure captures seconds = 0 forever!
      setSeconds(seconds + 1);
    }, 100);

    return () => clearInterval(timer);
  }, []); // Empty dependency array intentionally retained

  return <div data-testid="timer">{seconds}</div>;
}
