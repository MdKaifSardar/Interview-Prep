// solution.js
class TtlCache {
  constructor() {
    this._store = new Map();
  }

  set(key, value, ttlMs) {
    const expiresAt = ttlMs ? Date.now() + ttlMs : null;
    this._store.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this._store.get(key);
    if (!entry) return null;

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this._store.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  del(key) {
    return this._store.delete(key);
  }

  size() {
    // Purge expired before returning count
    const now = Date.now();
    for (const [key, entry] of this._store.entries()) {
      if (entry.expiresAt && now > entry.expiresAt) {
        this._store.delete(key);
      }
    }
    return this._store.size;
  }
}

module.exports = { TtlCache };
