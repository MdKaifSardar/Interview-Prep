// test.jsx
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { useFetch } = await import(target);

describe('REACT-13: useFetch with AbortController', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('aborts previous in-flight request when url changes', async () => {
    let abortedSignal = null;

    global.fetch = vi.fn().mockImplementation((url, { signal }) => {
      signal.addEventListener('abort', () => {
        abortedSignal = true;
      });
      return new Promise(() => {}); // Never resolves to simulate pending
    });

    const { rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: 'https://api.com/user/1' }
    });

    rerender({ url: 'https://api.com/user/2' });
    expect(abortedSignal).toBe(true);
  });
});
