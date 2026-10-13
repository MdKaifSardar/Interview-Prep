// solution.jsx
export async function fetchWithRetry(url, options = {}, retries = 2, timeoutMs = 1000) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (err) {
      clearTimeout(timer);
      if (attempt === retries) throw err;
      // Wait small backoff before retry
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
}
