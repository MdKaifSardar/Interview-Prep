// starter.jsx
import React, { useState, useRef, useEffect } from 'react';

export function usePrevious(value) {
  // TODO: Use ref to track and return previous value
  return undefined;
}

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const start = () => {
    // TODO: setInterval and store ID in timerRef
  };

  const stop = () => {
    // TODO: clearInterval(timerRef.current)
  };

  return (
    <div>
      <span data-testid="time">{time}</span>
      <button data-testid="start" onClick={start}>Start</button>
      <button data-testid="stop" onClick={stop}>Stop</button>
    </div>
  );
}
