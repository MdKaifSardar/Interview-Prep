// starter.jsx
import { useState, useEffect } from 'react';

/**
 * Custom hook fetching data with AbortController cleanup.
 * @param {string} url
 * @returns {{ data: any, loading: boolean, error: any }}
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Initialize AbortController and fetch with signal
  }, [url]);

  return { data, loading, error };
}
