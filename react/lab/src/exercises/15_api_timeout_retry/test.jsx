// test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';

const target = process.env.TEST_SOLUTION ? './solution.jsx' : './starter.jsx';
const { fetchWithRetry } = await import(target);

describe('REACT-15: Fetch with Timeout and Retry', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('retries on failure and succeeds on subsequent attempt', async () => {
    let count = 0;
    global.fetch = vi.fn().mockImplementation(() => {
      count++;
      if (count < 2) {
        return Promise.reject(new Error('Network error'));
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      });
    });

    const data = await fetchWithRetry('https://api.test', {}, 2, 500);
    expect(data).toEqual({ success: true });
    expect(count).toBe(2);
  });
});
