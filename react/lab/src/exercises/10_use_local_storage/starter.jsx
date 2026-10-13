// starter.jsx
import { useState } from 'react';

/**
 * Custom hook synchronizing state with window.localStorage.
 * @param {string} key
 * @param {any} initialValue
 * @returns {[any, Function]}
 */
export function useLocalStorage(key, initialValue) {
  // TODO
  const [storedValue, setStoredValue] = useState(initialValue);
  return [storedValue, setStoredValue];
}
